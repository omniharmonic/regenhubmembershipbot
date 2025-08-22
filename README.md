# RegenHub Bot

A Telegram bot that automatically checks an Airtable database weekly for new membership applications and sends notifications to a group chat.

## Features

- 🔄 **Weekly Automation**: Runs every Friday at 3:00 PM MST (9:00 PM UTC)
- 📊 **Database Integration**: Connects to Airtable to fetch membership applications
- 📱 **Telegram Notifications**: Sends formatted weekly reports to a group chat
- 🚀 **Serverless Deployment**: Deployed on Vercel with automatic scaling
- ⚡ **Lightweight**: Minimal dependencies and efficient execution

## Architecture

- **Framework**: Next.js 14 with TypeScript
- **Database**: Airtable API integration
- **Bot**: Telegram Bot API via node-telegram-bot-api
- **Scheduling**: Vercel Cron Jobs
- **Deployment**: Vercel serverless functions

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Vercel account
- Airtable account with API access
- Telegram bot token

### 2. Local Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd regenhub_bot
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp env.example .env.local
   ```

3. **Configure environment variables** in `.env.local`:
   ```env
   # Airtable Configuration
   AIRTABLE_API_KEY=your_airtable_api_key_here
   AIRTABLE_BASE_ID=your_airtable_base_id_here
   AIRTABLE_TABLE_NAME=your_table_name_here

   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   TELEGRAM_CHAT_ID=your_telegram_chat_id_here
   ```

### 3. Airtable Setup

1. **Get your API key**:
   - Go to [Airtable Account](https://airtable.com/account)
   - Generate an API key

2. **Get your Base ID**:
   - Open your Airtable base
   - The Base ID is in the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - Copy the `appXXXXXXXXXXXXXX` part

3. **Get your Table name**:
   - This is the name of your table containing membership applications

### 4. Telegram Bot Setup

1. **Create a bot**:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Use `/newbot` command
   - Follow instructions to create your bot
   - Save the bot token

2. **Get Chat ID**:
   - Add your bot to the target group
   - Send a message in the group
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find the `chat.id` in the response

### 5. Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add all the variables from your `.env.local` file

4. **Verify deployment**:
   - Visit your deployed URL
   - You should see the status page

## Cron Job Configuration

The bot runs weekly on Fridays at 9:00 PM UTC (3:00 PM MST) using Vercel's cron job feature. The schedule is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-check",
      "schedule": "0 21 * * 5"
    }
  ]
}
```

## Manual Testing

You can manually trigger the weekly check by visiting:
```
https://your-vercel-domain.vercel.app/api/cron/weekly-check
```

## Message Format

The bot sends formatted messages with:
- 📊 Weekly report header
- 📅 Date range covered
- 🎯 List of new applications with:
  - Name, email, organization, role
  - Application date
  - Phone, website, and description (if provided)
- 💡 Follow-up reminder

## Error Handling

The bot includes comprehensive error handling:
- Connection testing for both Airtable and Telegram
- Detailed logging with timestamps
- Graceful failure responses
- Environment variable validation

## Development

### Project Structure

```
src/
├── app/
│   ├── api/cron/weekly-check/route.ts  # Main cron job endpoint
│   └── page.tsx                        # Status page
├── lib/
│   ├── airtable.ts                     # Airtable integration
│   ├── telegram.ts                     # Telegram bot integration
│   └── utils.ts                        # Utility functions
└── types/
    └── index.ts                        # TypeScript definitions
```

### Local Development

```bash
npm run dev
```

### Building

```bash
npm run build
```

## Troubleshooting

### Common Issues

1. **Environment Variables Missing**:
   - Ensure all required variables are set in Vercel
   - Check `.env.local` for local development

2. **Telegram Bot Not Working**:
   - Verify bot token is correct
   - Ensure bot is added to the target group
   - Check chat ID is correct

3. **Airtable Connection Issues**:
   - Verify API key has correct permissions
   - Check base ID and table name
   - Ensure table has a "Created" field

4. **Cron Job Not Running**:
   - Check Vercel cron job configuration
   - Verify deployment is successful
   - Check Vercel function logs

## Support

For issues or questions:
1. Check the Vercel function logs
2. Verify all environment variables are set correctly
3. Test the API endpoint manually
4. Review the error messages in the response

## License

This project is private and proprietary to RegenHub.
