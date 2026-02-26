import { CATEGORIES, type Transaction, deleteTransaction } from "@/lib/store";
import { formatAmount } from "@/lib/format";
import { Trash2 } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onChanged: () => void;
}

const TransactionList = ({ transactions, onChanged }: TransactionListProps) => {
  const handleDelete = (id: string) => {
    deleteTransaction(id);
    onChanged();
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground animate-fade-in">
        <p className="text-3xl mb-2">📒</p>
        <p className="text-sm">아직 기록이 없어! 첫 기록을 남겨볼까?</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <h2 className="text-xl font-display text-foreground">지출 내역 📋</h2>
      {transactions.slice(0, 20).map((tx, i) => {
        const cat = CATEGORIES[tx.category];
        const dateStr = new Date(tx.date).toLocaleDateString('ko-KR', {
          month: 'short',
          day: 'numeric',
        });

        return (
          <div
            key={tx.id}
            className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 transition-all hover:shadow-sm group"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-2xl flex-shrink-0">
              {tx.type === 'income' ? '💰' : (cat?.icon ?? '🌟')}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {tx.memo || (tx.type === 'income' ? '수입' : cat?.label ?? '기타')}
              </p>
              <p className="text-xs text-muted-foreground">{dateStr} · {tx.type === 'income' ? '수입' : cat?.label}</p>
            </div>
            <p className={`text-sm font-bold flex-shrink-0 ${
              tx.type === 'income' ? 'text-accent-foreground' : 'text-primary'
            }`}>
              {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
            </p>
            <button
              onClick={() => handleDelete(tx.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
