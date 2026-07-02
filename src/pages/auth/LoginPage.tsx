import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "../../components/ThemeToggle"
import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { TelegramLogin } from "../../components/TelegramLogin"
import { AuthService } from "../../services/api/services/AuthService"
import { useAuth } from "../../hooks/use-auth"
import { Loader2 } from "lucide-react"
import { logger } from "../../utils/logger"
import type { api_TelegramAuthRequest } from "../../services/api/models/api_TelegramAuthRequest"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true })
    }
  }, [user, authLoading, navigate])

  const handleTelegramAuth = async (user: api_TelegramAuthRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await AuthService.postAuthTelegram(user)
      logger.info("Login successful:", response)
      // Redirect to dashboard after successful login
      navigate("/dashboard")
    } catch (err) {
      logger.error("Login failed:", err)
      setError("Could not sign in with Telegram. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show a subtle loading state while checking the initial session
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    )
  }

  return (
    <div className="fintech-stage transition-colors duration-300">
      <div className="animated-background" />
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-sm w-full glass-card border-none">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight text-center">
              Flizix
            </h1>
            <p className="text-sm text-zinc-500 dark:text-white/60 text-center">
              Your personal finance application
            </p>
          </div>
          
          <div className="space-y-4">
            <Input 
              label="Email" 
              placeholder="you@example.com" 
              type="email" 
              disabled={isLoading} 
              className="dark:bg-white/5 dark:border-white/10 dark:text-white"
            />
            <Button 
              className="w-full dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" 
              variant="primary" 
              disabled={isLoading}
            >
              Continue with Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#12141c] px-2 text-zinc-500 dark:text-white/40 rounded-full">Or use</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-white/60">
                <Loader2 className="animate-spin" size={16} />
                Verifying...
              </div>
            ) : (
              <TelegramLogin 
                botName={import.meta.env.VITE_TELEGRAM_BOT_NAME || "YourBotName"} 
                onAuth={handleTelegramAuth}
                cornerRadius={8}
                buttonSize="medium"
              />
            )}
            
            {error && (
              <p className="text-xs text-red-500 font-medium text-center">
                {error}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <p className="absolute bottom-8 text-xs text-zinc-400 dark:text-white/40">
        Flizix Personal Finance • 2026
      </p>
    </div>
  )
}
