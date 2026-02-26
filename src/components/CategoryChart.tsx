import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORIES, type Transaction } from "@/lib/store";
import { formatAmount } from "@/lib/format";

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(330, 60%, 72%)",  // primary pink
  "hsl(270, 40%, 85%)",  // lavender
  "hsl(165, 40%, 70%)",  // mint
  "hsl(20, 70%, 78%)",   // peach
  "hsl(42, 80%, 70%)",   // honey
  "hsl(200, 50%, 75%)",  // sky
];

const CategoryChart = ({ transactions }: CategoryChartProps) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl bg-card border border-border p-5 text-center animate-fade-in">
        <h2 className="text-xl font-display text-foreground mb-2">이달의 지출 📊</h2>
        <p className="text-sm text-muted-foreground py-4">지출 기록이 없어요!</p>
      </div>
    );
  }

  const categoryTotals: Record<string, number> = {};
  expenses.forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const data = Object.entries(categoryTotals)
    .map(([key, value]) => ({
      name: CATEGORIES[key]?.label ?? '기타',
      icon: CATEGORIES[key]?.icon ?? '🌟',
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl bg-card border border-border p-5 animate-fade-in">
      <h2 className="text-xl font-display text-foreground mb-4">이달의 지출 📊</h2>

      <div className="flex items-center gap-4">
        <div className="w-32 h-32 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatAmount(value)}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-foreground">{item.icon} {item.name}</span>
              </div>
              <span className="text-muted-foreground">
                {formatAmount(item.value)} ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
