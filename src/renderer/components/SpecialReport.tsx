import { useState } from 'react';

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

function SpecialReport() {
  const [data] = useState<Report[]>(testDataSet); // Fixed initialization of data state
  return (
    <div className="flex justify-center items-center text-xl">
      <table>
        <thead>
          <tr className="bg-[#236675] text-white">
            <th className="w-44">Invoice Number</th>
            <th className="sm:w-52 w-72">Customer Name</th>
            <th className="w-44">Address</th>
            <th className="w-32">House Name</th>
            <th className="w-32">Unit Name</th>
            <th className="w-32">Billed Date</th>
            <th className="w-32">Mass Date</th>
            <th className="w-52">Invoiced Items</th>
            <th className="w-32">Amount</th>
            <th className="w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={
                index % 2 === 0
                  ? 'border border-b-black'
                  : 'border border-b-black bg-gray-300'
              }
            >
              <td className="text-center">{item.invoice}</td>
              <td>{item.customerName}</td>
              <td>A</td>
              <td>A</td>
              <td>A</td>
              <td className="text-center">{item.date}</td>
              <td className="text-center">{item.date}</td>
              <td>A</td>
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
  );
}

export default SpecialReport;
