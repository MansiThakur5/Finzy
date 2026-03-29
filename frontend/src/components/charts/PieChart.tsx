import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const COLORS = [
  '#A855F7', // Purple
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#6366F1', // Indigo
];

const PieChart = ({ data }: PieChartProps) => {
  const total = data.values.reduce((a, b) => a + b, 0);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: COLORS,
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 0,
        cutout: '60%',
        borderRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
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
  };

  // Custom plugin to draw text in the center
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { ctx, chartArea: { top, bottom, left, right } } = chart;
      ctx.save();
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;

      // Draw "Total" label
      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TOTAL', centerX, centerY - 15);

      // Draw Amount
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`$${total.toLocaleString()}`, centerX, centerY + 5);
      ctx.restore();
    }
  };

  return <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />;
};

export default PieChart;
