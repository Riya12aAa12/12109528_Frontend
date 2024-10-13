import React from 'react';
import Chart from 'react-apexcharts';
import '../styles/Charts.css';

interface DataItem {
  arrival_date_year: number;
  arrival_date_month: number;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
}

interface TimeSeriesChartProps {
  data: DataItem[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const series = [{
    name: 'Visitors',
    data: data.map(item => ({
      x: `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`,
      y: item.adults + item.children + item.babies,
    }))
  }];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'timeseries-chart',
      type: 'line',
      zoom: { enabled: true },
      background: '#1e1e1e',
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#cccccc' } },
    },
    yaxis: {
      labels: { style: { colors: '#cccccc' } },
    },
    stroke: {
      width: 2,
      colors: ['#03dac6'],
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <div className="chart-container">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
