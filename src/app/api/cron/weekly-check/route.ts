import { NextRequest, NextResponse } from 'next/server';
import { AirtableService } from '@/lib/airtable';
import { TelegramService } from '@/lib/telegram';
import { getEnvironmentConfig, logWithTimestamp } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    logWithTimestamp('Weekly check cron job started');

    // Get environment configuration
    const config = getEnvironmentConfig();
    
    // Initialize services
    const airtableService = new AirtableService(config.airtable);
    const telegramService = new TelegramService(config.telegram);

    // Test connections
    const telegramConnected = await telegramService.testConnection();
    if (!telegramConnected) {
      throw new Error('Telegram bot connection failed');
    }

    logWithTimestamp('Services initialized successfully');

    // Fetch recent applications (last 7 days)
    const recentApplications = await airtableService.getRecentApplications(7);
    
    logWithTimestamp(`Found ${recentApplications.length} recent applications`);

    // Send weekly report to Telegram
    await telegramService.sendWeeklyReport(recentApplications);

    logWithTimestamp('Weekly report sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Weekly check completed successfully',
      applicationsCount: recentApplications.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logWithTimestamp('Error in weekly check cron job:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Optional: Add a POST endpoint for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
