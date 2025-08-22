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

      // Map field names - Airtable field names might be different
      const fields = app.fields;
      const name = fields.Name || fields.name || fields['Full Name'] || fields['Full name'] || 'Name not provided';
      const email = fields.Email || fields.email || 'Email not provided';
      const organization = fields.Organization || fields.organization || fields.Company || fields.company || 'Organization not provided';
      const role = fields.Role || fields.role || fields.Position || fields.position || 'Role not provided';
      const phone = fields.Phone || fields.phone || fields.Telephone || fields.telephone || '';
      const website = fields.Website || fields.website || fields.URL || fields.url || '';
      const telegram = fields.Telegram || fields.telegram || fields['Telegram Handle'] || '';
      const twitter = fields.Twitter || fields.twitter || fields['Twitter Handle'] || '';
      const pointOfContact = fields['Point of Contact'] || fields['Point of contact'] || fields.Contact || fields.contact || '';
      const membershipTier = fields['Membership Tier'] || fields['Membership tier'] || fields.Tier || fields.tier || '';
      const financialSupport = fields['Financial Support'] || fields['Financial support'] || fields.Support || fields.support || '';
      const description = fields.Description || fields.description || fields.Notes || fields.notes || '';

      message += `${index + 1}. <b>${name}</b>\n`;
      message += `   📧 ${email}\n`;
      message += `   🏢 ${organization}\n`;
      message += `   👤 ${role}\n`;
      message += `   📅 Applied: ${createdDate}\n`;
      
      if (phone) {
        message += `   📞 ${phone}\n`;
      }
      
      if (website) {
        message += `   🌐 ${website}\n`;
      }

      if (telegram) {
        message += `   💬 Telegram: ${telegram}\n`;
      }

      if (twitter) {
        message += `   🐦 Twitter: ${twitter}\n`;
      }

      if (pointOfContact) {
        message += `   👥 Point of Contact: ${pointOfContact}\n`;
      }

      if (membershipTier) {
        message += `   🏆 Membership Tier: ${membershipTier}\n`;
      }

      if (financialSupport) {
        message += `   💰 Financial Support: ${financialSupport}\n`;
      }
      
      if (description) {
        const desc = description.length > 100 
          ? description.substring(0, 100) + '...'
          : description;
        message += `   📝 ${desc}\n`;
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
