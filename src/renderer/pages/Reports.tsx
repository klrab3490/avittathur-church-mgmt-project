import { useState } from 'react';
import TopBar from '../components/TopBar';

function Reports() {
  const [report, setReport] = useState('');
  const [range, setRange] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  // function to handle search
  const handleSearch = (e: any) => {
    e.preventDefault();
    if ((report && range) || (report && from && to)) {
      return true;
    }
    return false;
  };
  return (
    <div className="ring-4 ring-bgSecondary p-10 rounded-xl">
      <TopBar />
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 py-10 px-5 text-[#236675]"
      >
        <span className="text-2xl font-bold">Reports</span>
        {/* Invoice Report Type */}
        <div className="flex flex-col">
          <span className="text-xl font-bold mb-4 mt-8">Select Report</span>
          <select
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
          >
            <option value="">Select Report</option>
            <option value="normal">Normal Report</option>
            <option value="special">Special Report</option>
          </select>
        </div>
        {/* Columns */}
        <div className="flex flex-col">
          <span className="text-xl font-bold mb-4 mt-8">Select Column</span>
          <input
            type="text"
            id="name"
            name="name"
            value="name"
            className="p-2 h-full rounded-lg border-2 border-black/15 bg-bgSecondary"
          />
        </div>
        {/* Duration */}
        <div className="flex flex-col">
          <span className="text-xl font-bold mb-4 mt-8">Select Duration</span>
          <div className="flex gap-5">
            <div className="flex flex-col">
              <span>Range</span>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="p-2 h-full rounded-lg border-2 border-black/15 bg-bgSecondary"
              >
                <option value="">Select Duration</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="last365days">Last 365 Days</option>
              </select>
            </div>
            <span className="text-2xl flex flex-col text-center justify-center">
              Or
            </span>
            <div className="flex gap-4 ">
              <div className="flex flex-col">
                <span>From</span>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />
              </div>
              <div className="flex flex-col">
                <span>To</span>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Search Button */}
        <button
          type="submit"
          className="bg-[#236675] text-white p-2 rounded-lg mt-8"
        >
          Generate Report
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{/* Table Data */}</tbody>
      </table>
    </div>
  );
}

export default Reports;
