import { useAuth } from "../../hooks/use-auth";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card, CardContent } from "../../components/ui/Card";
import { Loader2, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-4 text-center">
        <h1 className="text-xl font-semibold mb-2">No autorizado</h1>
        <p className="text-zinc-500 mb-6">Debes iniciar sesión para ver esta página.</p>
        <a href="/" className="text-blue-600 hover:underline text-sm font-medium">Volver al inicio</a>
      </div>
    );
  }

  const stats = [
    { label: "Balance Total", value: "$12,450.00", icon: PiggyBank, color: "text-blue-600" },
    { label: "Ingresos (Mes)", value: "+$3,200.00", icon: TrendingUp, color: "text-green-600" },
    { label: "Gastos (Mes)", value: "-$1,850.00", icon: TrendingDown, color: "text-red-600" },
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Hola de nuevo, {user.name}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Aquí tienes un resumen de tus finanzas hoy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800", stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder para actividad reciente */}
        <Card>
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">Actividad Reciente</h3>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                      <div className="h-2 w-16 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-3 w-12 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Necesitamos importar cn aquí también porque lo usamos en los stats
import { cn } from "../../utils/cn";
