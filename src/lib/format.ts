export function formatAmount(amount: number): string {
  return `₩${Math.abs(amount).toLocaleString('ko-KR')}`;
}
