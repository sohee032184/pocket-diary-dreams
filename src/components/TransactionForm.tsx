import { useState } from "react";
import { CATEGORIES, saveTransaction, getRandomCheer, type Transaction } from "@/lib/store";
import { toast } from "sonner";

interface TransactionFormProps {
  onSaved: () => void;
}

const TransactionForm = ({ onSaved }: TransactionFormProps) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("금액을 입력해줘! 💦");
      return;
    }

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: numAmount,
      category,
      memo,
      date: new Date().toISOString(),
    };

    saveTransaction(tx);
    toast.success(getRandomCheer());
    setAmount('');
    setMemo('');
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card border border-border p-5 space-y-4 animate-fade-in">
      <h2 className="text-xl font-display text-foreground">새로운 기록 ✍️</h2>

      {/* Type toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            type === 'income'
              ? 'bg-accent text-accent-foreground shadow-sm'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          💰 수입
        </button>
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            type === 'expense'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          🛍️ 지출
        </button>
      </div>

      {/* Amount */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">금액</label>
        <input
          type="number"
          placeholder="얼마?"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category */}
      {type === 'expense' && (
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">카테고리</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  category === key
                    ? 'bg-secondary text-secondary-foreground shadow-sm scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Memo */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">메모</label>
        <input
          type="text"
          placeholder="간단 메모 📝"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
      >
        기록하기 ✨
      </button>
    </form>
  );
};

export default TransactionForm;
