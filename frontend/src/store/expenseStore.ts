import { create } from 'zustand';

export interface Expense {
  _id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) => set((state) => ({ expenses: [expense, ...state.expenses] })),
  removeExpense: (id) => set((state) => ({ expenses: state.expenses.filter(e => e._id !== id) })),
}));
