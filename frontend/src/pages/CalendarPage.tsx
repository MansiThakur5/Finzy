import { useExpenseStore } from '../store/expenseStore';
import CalendarView from '../components/CalendarView';

const CalendarPage = () => {
  const { expenses } = useExpenseStore();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Financial <span className="text-indigo-600 dark:text-indigo-400">Calendar</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-bold max-w-2xl">
          Visualize your spending habits day by day. Select a date to see a detailed breakdown of your expenses and track your monthly budget progress.
        </p>
      </div>
      
      <CalendarView expenses={expenses} />
    </div>
  );
};

export default CalendarPage;
