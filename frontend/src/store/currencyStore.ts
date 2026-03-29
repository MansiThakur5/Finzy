import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate relative to USD (Base)
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 151.0 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.35 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
];

interface CurrencyState {
  selectedCurrency: Currency;
  setCurrency: (code: string) => void;
  convert: (amount: number) => number;
  toBase: (amount: number) => number;
  format: (amount: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selectedCurrency: currencies[0], // Default to USD
      setCurrency: (code) => {
        const currency = currencies.find(c => c.code === code) || currencies[0];
        set({ selectedCurrency: currency });
      },
      convert: (amount) => {
        const { selectedCurrency } = get();
        return amount * selectedCurrency.rate;
      },
      toBase: (amount) => {
        const { selectedCurrency } = get();
        return amount / selectedCurrency.rate;
      },
      format: (amount) => {
        const { selectedCurrency, convert } = get();
        const convertedAmount = convert(amount);
        
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: selectedCurrency.code,
          currencyDisplay: 'symbol',
        }).format(convertedAmount);
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);
