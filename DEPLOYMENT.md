# RegenHub Bot - Deployment Guide

## Quick Start Deployment

### 1. Prerequisites Setup

#### Airtable Setup
1. **Get API Key**:
   - Go to [Airtable Account](https://airtable.com/account)
   - Click "Generate API key"
   - Copy the key (starts with `key...`)

2. **Get Base ID**:
   - Open your Airtable base in browser
   - URL format: `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - Copy the `appXXXXXXXXXXXXXX` part

3. **Get Table Name**:
   - This is the exact name of your table (case-sensitive)
   - Example: "Membership Applications" or "Applications"

#### Telegram Bot Setup
1. **Create Bot**:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot`
   - Choose a name (e.g., "RegenHub Notifications")
   - Choose a username (e.g., "regenhub_notifications_bot")
   - Save the bot token (starts with `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Get Chat ID**:
   - Add your bot to the target group
   - Send any message in the group
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find `"chat":{"id":-123456789}` in the response
   - Copy the chat ID (including the minus sign if present)

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: regenhub-bot
# - Directory: ./ (current directory)
```

#### Option B: Deploy via GitHub
1. Push code to GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings

### 3. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add each variable:

```
AIRTABLE_API_KEY=key_your_airtable_api_key_here
AIRTABLE_BASE_ID=app_your_base_id_here
AIRTABLE_TABLE_NAME=your_table_name_here
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-123456789
```

3. Click **Save**
4. Redeploy the project

### 4. Test the Bot

1. **Test the API endpoint**:
   ```
   https://your-project.vercel.app/api/cron/weekly-check
   ```

2. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Functions
   - Click on the function
   - Check "Runtime Logs" for any errors

3. **Verify Telegram Message**:
   - The bot should send a test message to your group
   - If no applications found, it will send "No new applications this week"

### 5. Verify Cron Job

The cron job is configured in `vercel.json` to run every Friday at 9:00 PM UTC (3:00 PM MST):

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

**Note**: Vercel cron jobs require a paid plan (Pro or higher).

### 6. Troubleshooting

#### Common Issues:

1. **"Missing environment variables"**:
   - Double-check all variables are set in Vercel
   - Ensure no extra spaces or quotes

2. **"Telegram bot connection failed"**:
   - Verify bot token is correct
   - Ensure bot is added to the group
   - Check chat ID includes minus sign for groups

3. **"Airtable connection failed"**:
   - Verify API key has correct permissions
   - Check base ID and table name spelling
   - Ensure table has a "Created" field

4. **"Cron job not running"**:
   - Verify Vercel Pro plan is active
   - Check function logs for errors
   - Test endpoint manually first

#### Debug Steps:

1. **Check Function Logs**:
   ```bash
   vercel logs your-project-name
   ```

2. **Test Locally**:
   ```bash
   # Create .env.local with your variables
   npm run dev
   # Visit http://localhost:3000/api/cron/weekly-check
   ```

3. **Verify Airtable Data**:
   - Check your Airtable base has recent entries
   - Ensure "Created" field exists and has dates

### 7. Monitoring

- **Vercel Dashboard**: Monitor function execution and logs
- **Telegram Group**: Check for weekly messages
- **Airtable**: Verify new applications are being created

### 8. Maintenance

- **Weekly**: Check that messages are being sent
- **Monthly**: Review Vercel usage and logs
- **As Needed**: Update bot token or chat ID if changed

## Support

For issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test the API endpoint manually
4. Review the error messages in the response

The bot is designed to be self-maintaining once properly configured!
