import { formatAmount } from "@/lib/format";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div className="rounded-2xl bg-primary/10 p-6 text-center animate-fade-in">
      <p className="text-sm text-muted-foreground mb-1 font-body">이번 달 총 지출은</p>
      <h1 className="text-4xl font-bold font-display text-primary">
        {formatAmount(balance)}
      </h1>
      <p className="text-sm text-muted-foreground mt-1 font-body">
        썼어! 💸
      </p>
    </div>
  );
};

export default BalanceCard;
