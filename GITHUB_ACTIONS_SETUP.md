# GitHub Actions Cron Job Setup

This guide explains how to set up the free GitHub Actions cron job for the RegenHub bot.

## 🚀 **How It Works**

GitHub Actions will automatically trigger your Vercel function every Friday at 3:00 PM MST (10:00 PM UTC) using a scheduled workflow.

## 📋 **Setup Instructions**

### **Step 1: Push the Workflow to GitHub**

The workflow file is already created at `.github/workflows/weekly-cron.yml`. Just push it to your repository:

```bash
git add .github/workflows/weekly-cron.yml
git commit -m "Add GitHub Actions cron job workflow"
git push origin main
```

### **Step 2: Enable GitHub Actions**

1. **Go to your GitHub repository**: https://github.com/omniharmonic/regenhubmembershipbot
2. **Click on "Actions" tab**
3. **Click "Enable Actions"** if prompted
4. **The workflow will automatically appear** in the Actions tab

### **Step 3: Test the Workflow**

1. **Go to Actions tab** in your GitHub repository
2. **Click on "Weekly RegenHub Bot Cron Job"**
3. **Click "Run workflow"** → **"Run workflow"** (manual trigger)
4. **Check the logs** to see if it works

### **Step 4: Monitor Execution**

- **GitHub Actions tab**: Shows workflow execution history
- **Vercel Function logs**: Shows the actual bot execution
- **Telegram group**: Receives the weekly reports

## ⏰ **Schedule Details**

- **Frequency**: Every Friday
- **Time**: 3:00 PM MST (Mountain Standard Time)
- **UTC Time**: 10:00 PM UTC (22:00)
- **Cron Expression**: `0 22 * * 5`

## 🔧 **Workflow Features**

### **Automatic Scheduling**
- Runs every Friday at the specified time
- No manual intervention required

### **Manual Triggering**
- Can be triggered manually via GitHub Actions UI
- Useful for testing or immediate execution

### **Error Handling**
- Handles rate limiting (429 status)
- Detects authentication issues
- Provides detailed logging

### **Status Monitoring**
- Shows success/failure status
- Logs response details
- Easy to debug issues

## 📊 **Monitoring & Debugging**

### **Check Workflow Status**
1. Go to GitHub repository → Actions tab
2. Click on "Weekly RegenHub Bot Cron Job"
3. View recent runs and their status

### **View Execution Logs**
1. Click on any workflow run
2. Click on "Trigger RegenHub Bot" step
3. View detailed execution logs

### **Common Status Codes**
- **200**: Success ✅
- **429**: Rate limited (expected if run too frequently) ⚠️
- **401/403**: Authentication required 🔐
- **500**: Server error ❌

## 🛠️ **Troubleshooting**

### **Workflow Not Running**
1. **Check GitHub Actions is enabled**
2. **Verify the workflow file is in the correct location**
3. **Check GitHub Actions permissions**

### **Authentication Issues**
If you get 401/403 errors:
1. **Disable Vercel authentication protection**
2. **Or use a bypass token** (see Vercel docs)
3. **Update the workflow with the bypass token**

### **Rate Limiting**
If you get 429 errors:
1. **This is normal** - the bot has rate limiting
2. **Wait 5 minutes** between manual triggers
3. **The weekly schedule will work fine**

## 💰 **Cost**

- **GitHub Actions**: Free for public repositories
- **Vercel**: Free tier (Hobby plan)
- **Total Cost**: $0/month

## 🔄 **Alternative: Vercel Cron Jobs**

If you prefer to use Vercel's built-in cron jobs:
1. **Upgrade to Vercel Pro** ($20/month)
2. **Remove the GitHub Actions workflow**
3. **The cron job in `vercel.json` will work automatically**

## 📱 **Expected Results**

Every Friday at 3:00 PM MST, you should receive a message in your Telegram group:

```
📊 Weekly RegenHub Membership Report
📅 Week ending: Friday, [Date]

🎯 New Applications (X):

1. [Name]
   📧 [Email]
   🏢 [Organization]
   👤 [Role]
   📅 Applied: [Date]
   [Additional fields...]

💡 Please review these applications and follow up as needed.
```

The GitHub Actions workflow provides a completely free, reliable solution for your weekly bot automation! 🎯
