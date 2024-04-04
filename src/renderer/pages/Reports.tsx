import React, { useState } from 'react';
import TopBar from '../components/TopBar';

interface Report {
  id: number;
  invoice: string;
  customerName: string;
  date: string;
  amount: number;
}

const testDataSet: Report[] = [
  {
    id: 1,
    invoice: 'INV-0001',
    customerName: 'John Doe',
    date: '2024-03-03',
    amount: 1000,
  },
  {
    id: 2,
    invoice: 'INV-0002',
    customerName: 'Jane Smith',
    date: '2024-03-10',
    amount: 1500,
  },
  {
    id: 3,
    invoice: 'INV-0003',
    customerName: 'Alice Johnson',
    date: '2024-03-18',
    amount: 2000,
  },
];

function Reports() {
  const [report, setReport] = useState('');
  const [range, setRange] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data] = useState<Report[]>(testDataSet); // Fixed initialization of data state

  // function to handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
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
        {/* Duration */}
        <div className="flex flex-col">
          <span className="text-xl font-bold mb-4 mt-8">Select Duration</span>
          <div className="flex justify-center items-center gap-5">
            <div className="flex flex-col">
              <span>Range</span>
              <select
                onChange={(e) => setRange(e.target.value)}
                className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
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
      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr className="bg-[#236675] text-white border border-b-4 ">
              <th className="w-44">Invoice Number</th>
              <th className="sm:w-52 w-72">Customer Name</th>
              <th className="w-32">Date</th>
              <th className="w-32">Amount</th>
              <th className="w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.invoice}</td>
                <td>{item.customerName}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.amount}</td>
                <td className="flex gap-2 justify-center items-center">
                  <div>View</div>
                  <div>Download</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
