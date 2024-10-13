import React, { useState, useEffect } from 'react';
import TimeSeriesChart from './components/TimeSeriesChart';
import SparklineChart from './components/SparklineChart';
import ColumnChart from './components/ColumnChart';
import DateRangePicker from './components/DateRangePicker';
import './styles/App.css';
import './styles/Charts.css';
import '../src/styles.css';

// Define the type for your booking data
type Booking = {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [filteredData, setFilteredData] = useState<Booking[]>([]); // Use the same type as data

  useEffect(() => {
    fetch('/data/bookings.json')
      .then((response) => response.json())
      .then((data: Booking[]) => {
        setData(data);
        setFilteredData(data); // Initialize with full data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Explicitly define the type for 'filtered'
  const handleDateChange = (filtered: Booking[]) => {
    setFilteredData(filtered);
  };

  return (
    <div className="container">
      <h1>Hotel Booking Dashboard</h1>
      <div className="dashboard">
        <DateRangePicker data={data} onDateChange={handleDateChange} />
        <div className="chart-container">
          <TimeSeriesChart data={filteredData} />
        </div>
        <div className="chart-container">
          <SparklineChart data={filteredData} />
        </div>
        <div className="chart-container">
          <ColumnChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default App;
