import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    income: number[];
    expenses: number[];
  };
  title: string;
}

const LineChart = ({ data }: LineChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Income',
        data: data.income,
        borderColor: '#10B981', // Emerald
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1,
      },
      {
        label: 'Expense',
        data: data.expenses,
        borderColor: '#A855F7', // Purple
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#94a3b8',
          font: { size: 10, weight: 600 as const },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 8,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 10, weight: 600 as const },
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.05)',
          drawTicks: false,
        },
        border: { display: false },
        ticks: {
          color: '#64748b',
          font: { size: 10, weight: 600 as const },
          maxTicksLimit: 5,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
