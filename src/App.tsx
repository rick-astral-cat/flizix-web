import { ThemeToggle } from "./components/ThemeToggle"

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
          Flizix Web
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          Personal Finance Application
        </p>
        
        <div className="space-y-4">
          <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Coming Soon: Telegram Auth
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
