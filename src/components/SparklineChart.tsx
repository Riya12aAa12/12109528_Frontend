import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for type safety
import '../styles/Charts.css';

// Define the shape of the data items
interface DataItem {
  adults: number;
  children: number;
}

// Define the props for the SparklineChart component
interface SparklineChartProps {
  data: DataItem[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
  // Calculate totals for adults and children
  const totalAdults: number = data.reduce((acc, item) => acc + item.adults, 0);
  const totalChildren: number = data.reduce((acc, item) => acc + item.children, 0);

  // Create series data for the charts
  const seriesAdults = [{ data: data.map(item => item.adults) }];
  const seriesChildren = [{ data: data.map(item => item.children) }];

  // Define chart options for adults
  const optionsAdults: ApexOptions = {
    chart: {
      type: 'line', // Ensure this is a valid ApexCharts type
      sparkline: { enabled: true },
      background: '#1e1e1e',
    },
    stroke: {
      width: 2,
      colors: ['#03dac6'],
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `Adults: ${val} (Total: ${totalAdults})`,
      },
    },
  };

  // Define chart options for children
  const optionsChildren: ApexOptions = {
    chart: {
      type: 'line', // Ensure this is a valid ApexCharts type
      sparkline: { enabled: true },
      background: '#1e1e1e',
    },
    stroke: {
      width: 2,
      colors: ['#bb86fc'],
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `Children: ${val} (Total: ${totalChildren})`,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="totals">
        <div className="total-item">
          <strong>Total Adults:</strong> {totalAdults}
        </div>
        <Chart options={optionsAdults} series={seriesAdults} type="line" height={100} />
      </div>
      <div className="totals">
        <div className="total-item">
          <strong>Total Children:</strong> {totalChildren}
        </div>
        <Chart options={optionsChildren} series={seriesChildren} type="line" height={100} />
      </div>
    </div>
  );
};

export default SparklineChart;
