import { ThemeToggle } from "./components/ThemeToggle"
import { Button } from "./components/ui/Button"
import { Card, CardContent } from "./components/ui/Card"
import { Input } from "./components/ui/Input"
import { Send } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-sm w-full">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Bienvenido a Flizix
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Inicia sesión para gestionar tus finanzas.
            </p>
          </div>
          
          <div className="space-y-4">
            <Input label="Email" placeholder="tu@ejemplo.com" type="email" />
            <Button className="w-full" variant="primary">
              Continuar con Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">O también</span>
            </div>
          </div>

          <Button className="w-full gap-2" variant="outline">
            <Send size={16} />
            Iniciar con Telegram
          </Button>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-600">
        Flizix Personal Finance • 2026
      </p>
    </div>
  )
}

export default App
