import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AccountsService, type api_AccountResponse } from "../../services/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader2, Landmark, Coins, Plus, X, Trash2, AlertTriangle } from "lucide-react";
import { logger } from "../../utils/logger";

export default function AccountsPage() {
  const { user, loading: authLoading } = useAuth();
  const [accounts, setAccounts] = useState<api_AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Creation Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<number>(1); // Default to 1 (Checking)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Deletion States
  const [accountToDelete, setAccountToDelete] = useState<api_AccountResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  const handleOpenCreateModal = () => {
    setName("");
    setType(1);
    setSubmitError(null);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    if (!isSubmitting) {
      setIsCreateModalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await AccountsService.postAccounts({
        name: name.trim(),
        type: type,
      });
      setIsCreateModalOpen(false);
      fetchAccounts();
    } catch (err) {
      logger.error("Failed to create account:", err);
      setSubmitError("Failed to create account. Please check your inputs and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDeleteModal = (account: api_AccountResponse) => {
    setAccountToDelete(account);
    setDeleteError(null);
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setAccountToDelete(null);
    }
  };

  const handleDelete = async () => {
    if (!accountToDelete || accountToDelete.id === undefined) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);
      await AccountsService.deleteAccounts(accountToDelete.id);
      setAccountToDelete(null);
      fetchAccounts();
    } catch (err) {
      logger.error("Failed to delete account:", err);
      setDeleteError("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

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
          <Button 
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
          >
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
              <Button onClick={handleOpenCreateModal} variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Plus size={16} />
                Create Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => {
              const typeId = Number(account.type);
              const isBank = typeId === 1;
              const Icon = isBank ? Landmark : Coins;
              const typeLabel = typeId === 1 ? "Checking" : typeId === 2 ? "Cash" : "Other";
              
              return (
                <Card key={account.id} className="group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all relative">
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

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDeleteModal(account)}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer absolute top-3 right-3 h-8 w-8"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal - Create Account */}
      {isCreateModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-[80] transition-opacity" 
            onClick={handleCloseCreateModal}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[90] pointer-events-none">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl p-6 pointer-events-auto transition-transform scale-100 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg">
                  Create New Account
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCloseCreateModal}
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  <X size={18} />
                </Button>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Account Name"
                  placeholder="e.g. BBVA Debit, Main Wallet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-1">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setType(1)}
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                        type === 1
                          ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900/5 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 font-semibold"
                          : "border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <Landmark size={16} />
                      Checking
                    </button>
                    <button
                      type="button"
                      onClick={() => setType(2)}
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                        type === 2
                          ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900/5 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 font-semibold"
                          : "border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      <Coins size={16} />
                      Cash
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={handleCloseCreateModal}
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !name.trim()}
                    className="flex items-center justify-center gap-2 min-w-[100px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Saving...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal - Confirm Delete */}
      {accountToDelete && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-[80] transition-opacity" 
            onClick={handleCloseDeleteModal}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[90] pointer-events-none">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] w-full max-w-sm rounded-xl shadow-2xl p-6 pointer-events-auto transition-transform scale-100 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                    Delete Account
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Are you sure you want to delete the account <strong>"{accountToDelete.name}"</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium">
                  {deleteError}
                </div>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <Button 
                  variant="ghost" 
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                  className="cursor-pointer text-xs"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 dark:bg-red-650 dark:hover:bg-red-700 text-white border-none flex items-center justify-center gap-2 min-w-[80px] cursor-pointer text-xs"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
