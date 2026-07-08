import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { CardsService, AccountsService, type api_CardResponse, type api_AccountResponse } from "../../services/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader2, CreditCard, Plus, Calendar, X, Landmark, Coins } from "lucide-react";
import { logger } from "../../utils/logger";

export default function CardsPage() {
  const { user, loading: authLoading } = useAuth();
  const [cards, setCards] = useState<api_CardResponse[]>([]);
  const [accounts, setAccounts] = useState<api_AccountResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"credit" | "debit">("debit");
  const [accountId, setAccountId] = useState<number | "">("");
  const [creditLimit, setCreditLimit] = useState<string>("");
  const [cutoffDate, setCutoffDate] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchCardsAndAccounts = async () => {
    try {
      setLoading(true);
      const [cardsData, accountsData] = await Promise.all([
        CardsService.getCards(),
        AccountsService.getAccounts()
      ]);
      setCards(cardsData);
      setAccounts(accountsData);
      setError(null);
    } catch (err) {
      logger.error("Failed to load cards and accounts:", err);
      setError("Error loading cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCardsAndAccounts();
    }
  }, [user]);

  const handleOpenModal = () => {
    setName("");
    setType("debit");
    // Set default account id to first account if available
    setAccountId(accounts.length > 0 ? (accounts[0].id || "") : "");
    setCreditLimit("");
    setCutoffDate("");
    setSubmitError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (accountId === "") {
      setSubmitError("Please select a linked bank or cash account.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        name: name.trim(),
        type: type,
        account_id: Number(accountId),
        credit_limit: type === "credit" ? Number(creditLimit) : undefined,
        cutoff_date: type === "credit" ? Number(cutoffDate) : undefined,
      };

      await CardsService.postCards(payload);
      setIsModalOpen(false);
      fetchCardsAndAccounts();
    } catch (err) {
      logger.error("Failed to create card:", err);
      setSubmitError("Failed to create card. Please check your inputs and try again.");
    } finally {
      setIsSubmitting(false);
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
              Cards
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Manage your debit and credit cards here.
            </p>
          </div>
          <Button 
            onClick={handleOpenModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            New Card
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
        ) : cards.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mb-4">
                <CreditCard size={24} />
              </div>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">No cards found</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mb-6">
                Add a debit or credit card to link with your accounts and track limits and cutoffs.
              </p>
              <Button onClick={handleOpenModal} variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Plus size={16} />
                Add Card
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const isCredit = card.type?.toLowerCase() === "credit";
              const linkedAccount = accounts.find(a => a.id === card.account_id);
              
              return (
                <div 
                  key={card.id} 
                  className={`relative overflow-hidden rounded-2xl p-6 h-44 flex flex-col justify-between shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    isCredit 
                      ? "bg-gradient-to-br from-indigo-900 to-purple-950 text-white dark:from-indigo-950 dark:to-purple-950" 
                      : "bg-gradient-to-br from-zinc-800 to-zinc-900 text-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-white/[0.08]"
                  }`}
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
                    <CreditCard size={180} />
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                        {card.type} Card
                      </p>
                      <h4 className="font-semibold text-lg tracking-tight mt-0.5">
                        {card.name}
                      </h4>
                    </div>
                    <CreditCard size={22} className="opacity-80" />
                  </div>

                  <div className="space-y-2">
                    {isCredit && card.credit_limit !== undefined && (
                      <div>
                        <p className="text-[9px] uppercase font-semibold opacity-50 tracking-wider">
                          Credit Limit
                        </p>
                        <p className="font-semibold text-base">
                          ${card.credit_limit.toLocaleString()}
                        </p>
                      </div>
                    )}
                    
                    {isCredit && card.cutoff_date !== undefined && (
                      <div className="flex items-center gap-1.5 text-xs opacity-75">
                        <Calendar size={13} />
                        <span>Cutoff Day: {card.cutoff_date}</span>
                      </div>
                    )}

                    {linkedAccount && (
                      <div className="text-[10px] font-medium opacity-65 flex items-center gap-1.5 mt-2">
                        {Number(linkedAccount.type) === 1 ? <Landmark size={12} /> : <Coins size={12} />}
                        <span>Linked: {linkedAccount.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal - Create Card */}
      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-[80] transition-opacity" 
            onClick={handleCloseModal}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[90] pointer-events-none">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl p-6 pointer-events-auto transition-transform scale-100 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg">
                  Add New Card
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCloseModal}
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

              {accounts.length === 0 ? (
                <div className="text-center py-6 space-y-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    You need to create at least one Account before adding a card.
                  </p>
                  <a href="/accounts">
                    <Button type="button" className="cursor-pointer">
                      Go to Accounts
                    </Button>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Card Name"
                    placeholder="e.g. BBVA Gold, Wise Visa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-1">
                      Card Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setType("debit")}
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                          type === "debit"
                            ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900/5 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 font-semibold"
                            : "border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        Debit
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("credit")}
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                          type === "credit"
                            ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900/5 dark:bg-white/5 text-zinc-900 dark:text-zinc-100 font-semibold"
                            : "border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        Credit
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 ml-1">
                      Linked Account
                    </label>
                    <select
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value === "" ? "" : Number(e.target.value))}
                      disabled={isSubmitting}
                      required
                      className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.1] dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      <option value="" disabled>Select an account</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} ({Number(acc.type) === 1 ? "Checking" : "Cash"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {type === "credit" && (
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Credit Limit"
                        placeholder="e.g. 15000"
                        type="number"
                        min="0"
                        value={creditLimit}
                        onChange={(e) => setCreditLimit(e.target.value)}
                        disabled={isSubmitting}
                        required={type === "credit"}
                      />
                      <Input
                        label="Cutoff Day (1-31)"
                        placeholder="e.g. 15"
                        type="number"
                        min="1"
                        max="31"
                        value={cutoffDate}
                        onChange={(e) => setCutoffDate(e.target.value)}
                        disabled={isSubmitting}
                        required={type === "credit"}
                      />
                    </div>
                  )}

                  <div className="flex gap-3 justify-end pt-2">
                    <Button 
                      type="button"
                      variant="ghost" 
                      onClick={handleCloseModal}
                      disabled={isSubmitting}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !name.trim() || accountId === ""}
                      className="flex items-center justify-center gap-2 min-w-[100px] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Saving...
                        </>
                      ) : (
                        "Save Card"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
