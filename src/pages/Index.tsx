import { useState, useCallback } from "react";
import { getTransactions, getBalance } from "@/lib/store";
import BalanceCard from "@/components/BalanceCard";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import WishList from "@/components/WishList";
import CategoryChart from "@/components/CategoryChart";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  const transactions = getTransactions();
  const balance = getBalance();

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-3xl font-display text-primary animate-bounce-soft">
          My Pocket Diary 🍯
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-body">나만의 귀여운 용돈기입장</p>
      </header>

      <main className="container max-w-md mx-auto px-4 space-y-5" key={refreshKey}>
        <BalanceCard balance={balance} />
        <TransactionForm onSaved={refresh} />
        <CategoryChart transactions={transactions} />
        <WishList balance={balance} />
        <TransactionList transactions={transactions} onChanged={refresh} />
      </main>
    </div>
  );
};

export default Index;
