export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  memo: string;
  date: string;
}

export interface WishItem {
  id: string;
  name: string;
  price: number;
  saved: number;
}

const TRANSACTIONS_KEY = 'pocket-diary-transactions';
const WISHES_KEY = 'pocket-diary-wishes';

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTransaction(tx: Transaction) {
  const list = getTransactions();
  list.unshift(tx);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(list));
}

export function deleteTransaction(id: string) {
  const list = getTransactions().filter(t => t.id !== id);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(list));
}

export function getWishes(): WishItem[] {
  const data = localStorage.getItem(WISHES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveWishes(wishes: WishItem[]) {
  localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
}

export function getBalance(): number {
  const txs = getTransactions();
  return txs.reduce((sum, tx) => {
    return tx.type === 'income' ? sum + tx.amount : sum - tx.amount;
  }, 0);
}

export const CATEGORIES: Record<string, { label: string; icon: string }> = {
  food: { label: '식비', icon: '🍔' },
  stationery: { label: '문구', icon: '✏️' },
  fandom: { label: '덕질', icon: '🎤' },
  transport: { label: '교통비', icon: '🚌' },
  snack: { label: '간식', icon: '🍰' },
  other: { label: '기타', icon: '🌟' },
};

export const CHEER_MESSAGES = [
  "오늘도 알뜰하게 잘 썼어! 💕",
  "이건 정말 필요한 거였지? 칭찬해! ✨",
  "용돈 관리 프로구나! 멋져~ 🌸",
  "기록하는 습관, 최고야! 🍯",
  "잘 아끼고 있어! 넌 할 수 있어! 🎀",
  "오늘 하루도 수고했어! 🌈",
  "작은 절약이 큰 행복이 돼! 🦋",
];

export function getRandomCheer(): string {
  return CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)];
}
