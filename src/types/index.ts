export interface MembershipApplication {
  id: string;
  createdTime: string;
  fields: {
    name?: string;
    email?: string;
    organization?: string;
    role?: string;
    phone?: string;
    website?: string;
    description?: string;
    [key: string]: any;
  };
}

export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export interface AirtableConfig {
  apiKey: string;
  baseId: string;
  tableName: string;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}
