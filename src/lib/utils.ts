import { format, isFriday, isBefore, setHours, setMinutes } from 'date-fns';

export function isBeforeFriday3PM(date: Date = new Date()): boolean {
  const friday3PM = setMinutes(setHours(date, 15), 0); // 3 PM MST
  return isFriday(date) && isBefore(date, friday3PM);
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

export function getEnvironmentConfig() {
  const requiredEnvVars = [
    'AIRTABLE_API_KEY',
    'AIRTABLE_BASE_ID',
    'AIRTABLE_TABLE_NAME',
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    airtable: {
      apiKey: process.env.AIRTABLE_API_KEY!,
      baseId: process.env.AIRTABLE_BASE_ID!,
      tableName: process.env.AIRTABLE_TABLE_NAME!
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN!,
      chatId: process.env.TELEGRAM_CHAT_ID!
    }
  };
}

export function logWithTimestamp(message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data ? data : '');
}
