import { NextRequest, NextResponse } from 'next/server';
import { AirtableService } from '@/lib/airtable';
import { TelegramService } from '@/lib/telegram';
import { getEnvironmentConfig, logWithTimestamp } from '@/lib/utils';

// Simple rate limiting - prevent multiple executions within 5 minutes
let lastExecutionTime = 0;
const RATE_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    
    // Check rate limiting
    if (now - lastExecutionTime < RATE_LIMIT_MS) {
      const timeRemaining = Math.ceil((RATE_LIMIT_MS - (now - lastExecutionTime)) / 1000);
      logWithTimestamp(`Rate limited: Please wait ${timeRemaining} seconds before next execution`);
      return NextResponse.json({
        success: false,
        message: `Rate limited: Please wait ${timeRemaining} seconds before next execution`,
        timestamp: new Date().toISOString()
      }, { status: 429 });
    }
    
    lastExecutionTime = now;
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
    
    // Log the first application details for debugging
    if (recentApplications.length > 0) {
      logWithTimestamp('First application details:', {
        id: recentApplications[0].id,
        createdTime: recentApplications[0].createdTime,
        fields: recentApplications[0].fields
      });
    }

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
