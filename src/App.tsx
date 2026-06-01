import { useState } from "react"
import { ThemeToggle } from "./components/ThemeToggle"
import { Button } from "./components/ui/Button"
import { Card, CardContent } from "./components/ui/Card"
import { Input } from "./components/ui/Input"
import { TelegramLogin } from "./components/TelegramLogin"
import { AuthService } from "./services/api/services/AuthService"
import { Loader2 } from "lucide-react"
import type { internal_api_TelegramAuthRequest } from "./services/api/models/internal_api_TelegramAuthRequest"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTelegramAuth = async (user: internal_api_TelegramAuthRequest) => {
    setIsLoading(true)
    setError(null)
    try {
      // Enviamos los datos al backend usando el servicio generado
      const response = await AuthService.postAuthTelegram(user)
      console.log("Login exitoso:", response)
      alert(`¡Bienvenido, ${response.name}!`)
    } catch (err) {
      console.error("Error en login:", err)
      setError("No se pudo iniciar sesión con Telegram. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-sm w-full">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight text-center">
              Flizix
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
              Tu aplicación de finanzas personales
            </p>
          </div>
          
          <div className="space-y-4">
            <Input label="Email" placeholder="tu@ejemplo.com" type="email" disabled={isLoading} />
            <Button className="w-full" variant="primary" disabled={isLoading}>
              Continuar con Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">O utiliza</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Loader2 className="animate-spin" size={16} />
                Verificando...
              </div>
            ) : (
              <TelegramLogin 
                botName={import.meta.env.VITE_TELEGRAM_BOT_NAME || "YourBotName"} 
                onAuth={handleTelegramAuth}
                cornerRadius={8}
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
      
      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
        Flizix Personal Finance • 2026
      </p>
    </div>
  )
}

export default App
