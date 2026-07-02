import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { CardsService, type api_CardResponse } from "../../services/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Loader2, CreditCard, Plus, Calendar, ShieldAlert } from "lucide-react";
import { logger } from "../../utils/logger";

export default function CardsPage() {
  const { user, loading: authLoading } = useAuth();
  const [cards, setCards] = useState<api_CardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await CardsService.getCards();
      setCards(data);
      setError(null);
    } catch (err) {
      logger.error("Failed to load cards:", err);
      setError("Error loading cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCards();
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
              Cards
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Manage your debit and credit cards here.
            </p>
          </div>
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer">
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
              <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                <Plus size={16} />
                Add Card
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const isCredit = card.type?.toLowerCase() === "credit";
              
              return (
                <div 
                  key={card.id} 
                  className={`relative overflow-hidden rounded-2xl p-6 h-44 flex flex-col justify-between shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    isCredit 
                      ? "bg-gradient-to-br from-indigo-900 to-purple-950 text-white dark:from-indigo-950 dark:to-purple-950" 
                      : "bg-gradient-to-br from-zinc-850 to-zinc-950 text-white border border-zinc-800"
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

                  <div className="space-y-3">
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

                    {!isCredit && (
                      <div className="text-[11px] font-medium opacity-65 flex items-center gap-1">
                        <span>Linked Account</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
