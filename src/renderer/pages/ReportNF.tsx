import { useState, FormEvent } from 'react';
import TopBar from '../components/TopBar';
import NormalReport from '../components/NormalReport';

// Define interface for your form data
interface InvoiceItemsObject {
  id: string;
  functionName: string;
  price: number;
  Booked: number;
  total: number;
}
interface Report {
  id: number;
  name: String;
  invoice: String;
  address: String;
  housename: String;
  unit: String;
  formdate: Date;
  dateOfHolymass: Date;
  amount: number;
  note: String;
  invoiceItems: [InvoiceItemsObject];
}

function ReportNF({ normalForm }: { normalForm: Report[] }) {
  const [report, setReport] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // function to handle search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (report && from && to) {
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
        <span className="text-2xl font-bold">Normal Form Reports</span>
        {/* Duration */}
        <div className="flex flex-col">
          <span className="text-xl font-bold mb-4 mt-8">Select Duration</span>
          <div className="flex justify-center items-center gap-5">
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
      <NormalReport data={normalForm} />
    </div>
  );
}

export default ReportNF;
