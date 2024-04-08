import { useState } from 'react';

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

function SpecialReport({ data }: { data: Report[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col justify-center items-center text-xl">
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
            <th className="w-72">Invoiced Items</th>
            <th className="w-32">Amount</th>
            <th className="w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={item.id}
              className={
                index % 2 === 0
                  ? 'border border-b-black'
                  : 'border border-b-black bg-gray-300'
              }
            >
              <td className="text-center">{item.invoice}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.housename}</td>
              <td>{item.unit}</td>
              <td className="text-center">
                {new Date(item.formdate).toDateString()}
              </td>
              <td className="text-center">
                {new Date(item.dateOfHolymass).toDateString()}
              </td>
              <td className="text-center">
                <ul className="">
                  {item.invoiceItems.map((invoiceItem) => (
                    <li key={invoiceItem.id}>{invoiceItem.functionName}</li>
                  ))}
                </ul>
              </td>
              <td className="text-center">{item.amount}</td>
              <td className="flex flex-col gap-2 justify-center items-center text-center">
                <div>View</div>
                <div>Download</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <div
              key={pageNumber}
              className="flex items-stretch justify-between text-3xl bg-[#236675] text-white rounded-lg hover:bg-[#75cbe7]"
            >
              <button
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                className={
                  currentPage === pageNumber
                    ? 'bg-[#1a4e5f] w-12 h-12 flex items-center justify-center rounded-xl'
                    : 'flex rounded-xl w-12 h-12 items-center justify-center'
                }
              >
                {pageNumber}
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default SpecialReport;
