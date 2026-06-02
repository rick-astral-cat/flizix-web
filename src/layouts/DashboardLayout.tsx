import type { ReactNode } from "react";
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Settings,
  LogOut,
  X,
  Menu,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/ThemeToggle";
import { AuthService } from "../services/api/services/AuthService";
import { logger } from "../utils/logger";

interface DashboardLayoutProps {
  children: ReactNode;
  user: { name?: string; email?: string };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await AuthService.postAuthLogout();
      // After successful logout on the backend, redirect to login page.
      // Since the cookie is HttpOnly, the browser will clear it based on the server response.
      navigate("/", { replace: true });
    } catch (error) {
      logger.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
      setIsAccountDrawerOpen(false);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: Wallet, label: "Accounts" },
    { icon: ArrowUpRight, label: "Income" },
    { icon: ArrowDownLeft, label: "Expenses" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Sidebar - Notion-style */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          !isSidebarOpen && "-translate-x-full md:w-0 md:opacity-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Flizix
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X size={18} />
            </Button>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer text-left",
                  item.active 
                    ? "bg-zinc-200/50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/30 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setIsAccountDrawerOpen(true)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/30 dark:hover:bg-zinc-800/50 rounded-lg transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-600 dark:text-zinc-300 overflow-hidden">
                {user.name?.charAt(0) || "U"}
              </div>
              <span className="truncate">{user.name || "User"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(true)}
                className="text-zinc-500"
              >
                <Menu size={18} />
              </Button>
            )}
            <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Overview
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAccountDrawerOpen(true)}
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-zinc-200 dark:hover:ring-zinc-800 transition-all cursor-pointer"
            >
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                {user.name?.charAt(0) || "U"}
              </span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Account Drawer - Minimalist style */}
      {isAccountDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] z-[60]" 
            onClick={() => setIsAccountDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-zinc-900 shadow-2xl z-[70] border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col transition-transform duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Account</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsAccountDrawerOpen(false)}>
                <X size={18} />
              </Button>
            </div>

            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-zinc-200 dark:border-zinc-700 text-2xl overflow-hidden">
                {user.name?.charAt(0) || "U"}
              </div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email || "No email"}</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
                  Preferences
                </label>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 gap-3"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? <Loader2 className="animate-spin" size={18} /> : <LogOut size={18} />}
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
