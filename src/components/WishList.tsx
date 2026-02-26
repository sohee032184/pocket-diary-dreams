import { useState } from "react";
import { getWishes, saveWishes, type WishItem } from "@/lib/store";
import { formatAmount } from "@/lib/format";
import { Plus, Trash2 } from "lucide-react";

interface WishListProps {
  balance: number;
}

const WishList = ({ balance }: WishListProps) => {
  const [wishes, setWishes] = useState<WishItem[]>(getWishes);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const refresh = (updated: WishItem[]) => {
    saveWishes(updated);
    setWishes(updated);
  };

  const handleAdd = () => {
    const p = parseInt(price);
    if (!name || !p || p <= 0) return;
    const item: WishItem = { id: crypto.randomUUID(), name, price: p, saved: 0 };
    refresh([...wishes, item]);
    setName('');
    setPrice('');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    refresh(wishes.filter(w => w.id !== id));
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display text-foreground">위시리스트 🎁</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {showForm && (
        <div className="space-y-2 animate-pop">
          <input
            type="text"
            placeholder="사고 싶은 것 🌟"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="number"
            placeholder="가격"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleAdd}
            className="w-full py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            추가하기 ✨
          </button>
        </div>
      )}

      {wishes.length === 0 && !showForm && (
        <p className="text-sm text-muted-foreground text-center py-4">
          사고 싶은 것을 추가해봐! 🛒
        </p>
      )}

      {wishes.map(wish => {
        const percent = Math.min(100, Math.round((balance / wish.price) * 100));
        const canBuy = balance >= wish.price;

        return (
          <div key={wish.id} className="space-y-2 group">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{wish.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">{formatAmount(wish.price)}</p>
                <button
                  onClick={() => handleDelete(wish.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  canBuy ? 'bg-accent' : 'bg-primary/60'
                }`}
                style={{ width: `${Math.max(0, percent)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {canBuy ? '🎉 살 수 있어!' : `${Math.max(0, percent)}% 모았어!`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;
