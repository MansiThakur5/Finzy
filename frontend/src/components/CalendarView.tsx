import { useState, useMemo } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  parseISO,
  eachDayOfInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Wallet } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Expense } from '../store/expenseStore';
import { useCurrencyStore } from '../store/currencyStore';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CalendarViewProps {
  expenses: Expense[];
}

const CalendarView = ({ expenses }: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  // Group expenses by date string
  const expensesByDate = useMemo(() => {
    const grouped: Record<string, Expense[]> = {};
    expenses.forEach(expense => {
      try {
        const dateStr = format(parseISO(expense.date), 'yyyy-MM-dd');
        if (!grouped[dateStr]) grouped[dateStr] = [];
        grouped[dateStr].push(expense);
      } catch (e) {
        console.error('Failed to parse date', expense.date, e);
      }
    });
    return grouped;
  }, [expenses]);

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedDayExpenses = selectedDate ? (expensesByDate[selectedDateStr] || []) : [];
  const dailyTotal = selectedDayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const { format: formatCurrency } = useCurrencyStore(); // Removed non-existent currencySymbol

  return (
    <div className="flex flex-col gap-8 animate-fade-in relative z-10 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Left Column: Calendar Grid */}
        <div className="xl:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-indigo-50 dark:bg-indigo-900/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight capitalize">
                  {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">Track your daily spending patterns</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700">
              <button
                onClick={prevMonth}
                className="p-2.5 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-5 py-2.5 text-sm font-black text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2.5 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center py-2 text-[10px] sm:text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dayExpenses = expensesByDate[dateStr] || [];
              const dayTotal = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, monthStart);

              return (
                <button
                  key={dateStr}
                  onClick={() => isCurrentMonth && setSelectedDate(day)}
                  className={cn(
                    "relative aspect-square sm:aspect-[1/1] p-3 rounded-[1.5rem] transition-all flex flex-col items-center sm:items-start group border-2",
                    !isCurrentMonth ? "opacity-20 cursor-default pointer-events-none" : "hover:scale-[1.02] cursor-pointer active:scale-95",
                    isSelected 
                      ? "bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-500/30 text-white z-20" 
                      : isToday 
                      ? "bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                      : "bg-gray-50/50 dark:bg-slate-900/30 border-transparent hover:border-gray-200 dark:hover:border-slate-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <span className={cn(
                    "text-sm sm:text-lg font-black",
                    isSelected ? "text-white" : ""
                  )}>
                    {format(day, 'd')}
                  </span>
                  
                  {isCurrentMonth && dayTotal > 0 && (
                    <div className="mt-auto w-full flex flex-col items-center sm:items-start group-hover:translate-x-1 transition-transform">
                      <div className={cn(
                        "hidden sm:block text-[11px] font-black tracking-tight truncate",
                        isSelected ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {formatCurrency(dayTotal)}
                      </div>
                      <div className="flex gap-0.5 mt-1 sm:mt-1.5">
                        {dayExpenses.slice(0, 3).map((_, i) => (
                          <div key={i} className={cn(
                            "w-1 h-1 rounded-full",
                            isSelected ? "bg-white/60" : "bg-indigo-500 dark:bg-indigo-400"
                          )} />
                        ))}
                        {dayExpenses.length > 3 && (
                          <div className={cn(
                            "w-1 h-1 rounded-full opacity-50",
                            isSelected ? "bg-white/40" : "bg-indigo-300 dark:bg-indigo-900"
                          )} />
                        )}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Daily Details */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700/50 p-6 sm:p-8 flex flex-col min-h-[500px] xl:min-h-full">
          <div className="mb-8 p-1">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Day Summary</h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </p>
          </div>

          {selectedDate && selectedDayExpenses.length > 0 ? (
            <div className="flex-grow flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-br from-gray-900 to-slate-800 dark:from-slate-700 dark:to-slate-900 rounded-[1.5rem] p-6 text-white shadow-2xl shadow-gray-500/10 mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                  <Wallet className="h-32 w-32" />
                </div>
                <p className="text-gray-400 dark:text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">Total Expenditure</p>
                <h4 className="text-4xl font-black mt-2 tracking-tighter relative z-10">{formatCurrency(dailyTotal)}</h4>
              </div>

              <div className="flex-grow space-y-4 overflow-y-auto custom-scrollbar pr-3 -mr-3 pb-4">
                {selectedDayExpenses.map((expense) => (
                  <div 
                    key={expense._id} 
                    className="flex items-center justify-between p-5 bg-white dark:bg-slate-900/50 rounded-[1.25rem] border border-gray-100 dark:border-slate-700/50 group hover:border-indigo-300 dark:hover:border-indigo-900/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 dark:text-white leading-none">{expense.title}</p>
                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1.5 inline-block px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-md">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem] mt-auto">
              <div className="p-6 bg-gray-50/50 dark:bg-slate-900/50 rounded-full mb-6 relative">
                <div className="absolute inset-0 bg-indigo-500/5 rounded-full animate-ping" />
                <CalendarIcon className="h-10 w-10 text-gray-300 dark:text-gray-600 relative z-10" />
              </div>
              <p className="text-gray-900 dark:text-white font-black text-lg">
                {selectedDate ? 'No Spending Found' : 'Select a date'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-2 max-w-[200px] leading-relaxed">
                {selectedDate 
                  ? 'Your financial record is clean for this day! No expenses detected.' 
                  : 'Tap any active date on the left grid to see detailed financial breakdown.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
