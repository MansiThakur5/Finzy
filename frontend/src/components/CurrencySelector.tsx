import { useCurrencyStore, currencies } from '../store/currencyStore';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CurrencySelector = () => {
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
      >
        <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
          {selectedCurrency.code} ({selectedCurrency.symbol})
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-[100] animate-fade-in divide-y divide-gray-50 dark:divide-slate-700/50">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                setCurrency(currency.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors ${
                selectedCurrency.code === currency.code ? 'bg-blue-50/50 dark:bg-slate-700/30' : ''
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {currency.code}
                </span>
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  {currency.name}
                </span>
              </div>
              <span className={`text-sm font-black ${
                selectedCurrency.code === currency.code ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
              }`}>
                {currency.symbol}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
