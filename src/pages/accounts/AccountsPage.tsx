import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AccountsService, type api_AccountResponse } from "../../services/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Loader2, Landmark, Coins, Plus, Trash2 } from "lucide-react";
import { logger } from "../../utils/logger";

export default function AccountsPage() {
  const { user, loading: authLoading } = useAuth();
  const [accounts, setAccounts] = useState<api_AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await AccountsService.getAccounts();
      setAccounts(data);
      setError(null);
    } catch (err) {
      logger.error("Failed to load accounts:", err);
      setError("Error loading accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-background p-4 text-center">
        <h1 className="text-xl font-semibold mb-2">Unauthorized</h1>
        <p className="text-zinc-500 mb-6">You must sign in to view this page.</p>
        <a href="/" className="text-blue-600 hover:underline text-sm font-medium">Back to Home</a>
      </div>
    );
  }

  return (
    <DashboardLayout user={user}>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Accounts
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Manage your cash and bank accounts here.
            </p>
          </div>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Plus size={16} />
            New Account
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-zinc-400" size={28} />
          </div>
        ) : accounts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
                <Landmark size={24} />
              </div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">No accounts found</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mb-6">
                Create a bank or cash account to start tracking your balances and transactions.
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus size={16} />
                Create Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => {
              // Convert to number safely since the backend returns it as int64 ID
              const typeId = Number(account.type);
              const isBank = typeId === 1;
              const Icon = isBank ? Landmark : Coins;
              const typeLabel = typeId === 1 ? "Checking" : typeId === 2 ? "Cash" : "Other";
              
              return (
                <Card key={account.id} className="group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                  <CardContent className="p-5 flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                          {account.name}
                        </h4>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 uppercase rounded">
                          {typeLabel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
