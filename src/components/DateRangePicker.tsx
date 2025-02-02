import React, { useState } from 'react';
import '../styles/DateRangePicker.css';

// Define the types for Booking and props
type Booking = {
  id: number; // Or string, depending on your data structure
  customerName: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:mm
  partySize: number;
  arrival_date_year: number;
  arrival_date_month: number;
  arrival_date_day_of_month: number;
};

type DateRangePickerProps = {
  data: Booking[];
  onDateChange: (filteredData: Booking[]) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ data, onDateChange }) => {
  const [startYear, setStartYear] = useState<string>('');
  const [startMonth, setStartMonth] = useState<string>('');
  const [startDay, setStartDay] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [endDay, setEndDay] = useState<string>('');

  const years = [...Array(15).keys()].map(i => 2010 + i);
  const months = [...Array(12).keys()].map(i => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));
  const days = [...Array(31).keys()].map(i => i + 1);

  // Handle changes for start date
  const handleStartYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setStartYear(newYear);
    filterData(newYear, startMonth, startDay, endYear, endMonth, endDay);
  };

  const handleStartMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setStartMonth(newMonth);
    filterData(startYear, newMonth, startDay, endYear, endMonth, endDay);
  };

  const handleStartDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = event.target.value;
    setStartDay(newDay);
    filterData(startYear, startMonth, newDay, endYear, endMonth, endDay);
  };

  // Handle changes for end date
  const handleEndYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setEndYear(newYear);
    filterData(startYear, startMonth, startDay, newYear, endMonth, endDay);
  };

  const handleEndMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    setEndMonth(newMonth);
    filterData(startYear, startMonth, startDay, endYear, newMonth, endDay);
  };

  const handleEndDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = event.target.value;
    setEndDay(newDay);
    filterData(startYear, startMonth, startDay, endYear, endMonth, newDay);
  };

  // Function to filter data based on selected date range
  const filterData = (
    startYear: string,
    startMonth: string,
    startDay: string,
    endYear: string,
    endMonth: string,
    endDay: string
  ) => {
    // Validate that all parts of the date are provided
    if (startYear && startMonth && startDay && endYear && endMonth && endDay) {
      const startDate = new Date(Number(startYear), Number(startMonth) - 1, Number(startDay));
      const endDate = new Date(Number(endYear), Number(endMonth) - 1, Number(endDay));

      const filtered = data.filter(item => {
        const itemDate = new Date(
          item.arrival_date_year,
          item.arrival_date_month - 1,
          item.arrival_date_day_of_month
        );
        return itemDate >= startDate && itemDate <= endDate;
      });
      onDateChange(filtered);
    }
  };

  return (
    <div className="date-range-picker">
      <h4>Select Date Range:</h4>
      <div className="date-picker">
        <span>From:</span>
        <select onChange={handleStartYearChange} value={startYear}>
          <option value="" disabled>Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select onChange={handleStartMonthChange} value={startMonth}>
          <option value="" disabled>Select Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select onChange={handleStartDayChange} value={startDay}>
          <option value="" disabled>Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div className="date-picker">
        <span>To:</span>
        <select onChange={handleEndYearChange} value={endYear}>
          <option value="" disabled>Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select onChange={handleEndMonthChange} value={endMonth}>
          <option value="" disabled>Select Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select onChange={handleEndDayChange} value={endDay}>
          <option value="" disabled>Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangePicker; // Ensure you have this line to export the component.
