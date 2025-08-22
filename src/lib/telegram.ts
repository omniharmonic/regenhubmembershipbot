import TelegramBot from 'node-telegram-bot-api';
import { TelegramConfig, TelegramMessage } from '@/types';

export class TelegramService {
  private bot: TelegramBot;
  private chatId: string;

  constructor(config: TelegramConfig) {
    this.bot = new TelegramBot(config.botToken, { polling: false });
    this.chatId = config.chatId;
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.bot.sendMessage(this.chatId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });
      console.log('Message sent successfully to Telegram');
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      throw new Error('Failed to send message to Telegram');
    }
  }

  async sendWeeklyReport(applications: any[]): Promise<void> {
    const message = this.formatWeeklyReport(applications);
    await this.sendMessage(message);
  }

  private formatWeeklyReport(applications: any[]): string {
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let message = `📊 <b>Weekly RegenHub Membership Report</b>\n`;
    message += `📅 <b>Week ending:</b> ${date}\n\n`;

    if (applications.length === 0) {
      message += `ℹ️ <i>No new membership applications this week.</i>`;
      return message;
    }

    message += `🎯 <b>New Applications (${applications.length}):</b>\n\n`;

    applications.forEach((app, index) => {
      const createdDate = new Date(app.createdTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      message += `${index + 1}. <b>${app.fields.name || 'Name not provided'}</b>\n`;
      message += `   📧 ${app.fields.email || 'Email not provided'}\n`;
      message += `   🏢 ${app.fields.organization || 'Organization not provided'}\n`;
      message += `   👤 ${app.fields.role || 'Role not provided'}\n`;
      message += `   📅 Applied: ${createdDate}\n`;
      
      if (app.fields.phone) {
        message += `   📞 ${app.fields.phone}\n`;
      }
      
      if (app.fields.website) {
        message += `   🌐 ${app.fields.website}\n`;
      }
      
      if (app.fields.description) {
        const description = app.fields.description.length > 100 
          ? app.fields.description.substring(0, 100) + '...'
          : app.fields.description;
        message += `   📝 ${description}\n`;
      }
      
      message += `\n`;
    });

    message += `\n💡 <i>Please review these applications and follow up as needed.</i>`;
    
    return message;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.bot.getMe();
      return true;
    } catch (error) {
      console.error('Telegram bot connection test failed:', error);
      return false;
    }
  }
}
