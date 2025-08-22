export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            RegenHub Bot
          </h1>
          <p className="text-gray-600 mb-4">
            Telegram bot for membership application notifications
          </p>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Status: Running
            </h2>
            <p className="text-xs text-gray-500">
              Weekly cron job scheduled for Fridays at 9:00 PM UTC (3:00 PM MST)
            </p>
          </div>
          <div className="mt-6 text-xs text-gray-400">
            <p>Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
