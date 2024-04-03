import { IoIosTrash } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';

interface InvoiceItemsObject {
  id: string;
  functionName: string;
  price: number;
  Booked: number;
  total: number;
}

function Form2() {
  const [invoice, setInvoice] = useState('0000');
  const emptyInvoiceItem = {
    id: crypto.randomUUID().toString(),
    functionName: '',
    price: 0,
    Booked: 1,
    total: 0,
  };
  const [InvoiceItems, setInvoiceItems] = useState<InvoiceItemsObject[]>([
    emptyInvoiceItem,
  ]);
  const [Total, setTotal] = useState(0);

  // Update total and calculate price*qty whenever change in items
  useEffect(() => {
    const updatedItems = InvoiceItems.map((invoiceItem) => ({
      invoiceId: `S${invoice.toString()}`,
      ...invoiceItem,
      total: invoiceItem.price * invoiceItem.Booked,
    }));
    const totalAmount = updatedItems.reduce((acc, { total }) => acc + total, 0);

    // Only update state if the total has changed
    if (totalAmount !== Total) {
      setTotal(totalAmount);
      setInvoiceItems(updatedItems);
    }
  }, [InvoiceItems, Total, invoice]);

  // Function for handling inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    item: InvoiceItemsObject,
  ) => {
    setInvoiceItems(
      InvoiceItems.map((invoiceItem) =>
        invoiceItem.id === item.id
          ? { ...invoiceItem, [e.target.name]: e.target.value }
          : invoiceItem,
      ),
    );
  };

  // form data
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [address, setAddress] = useState('');
  const [house, setHouse] = useState('');
  const [unit, setUnit] = useState('');
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [bookDate, setBookDate] = useState('');
  const [note, setNote] = useState('');

  // form clear
  const clearForm = () => {
    setInvoice((prevInvoice) => {
      const num = parseInt(prevInvoice, 10);
      const incrementedNum = num + 1;
      return incrementedNum.toString().padStart(4, '0');
    });
    setFName('');
    setLName('');
    setAddress('');
    setHouse('');
    setUnit('');
    setBookDate('');
    setNote('');
    setInvoiceItems([emptyInvoiceItem]);
  };

  // form submit
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: `${fname} ${lname}`,
      invoice: `N${invoice}`,
      address,
      housename: house,
      unit,
      formdate: issueDate,
      dateOfHolymass: bookDate,
      amount: Total * 1.0,
      note,
    };
    console.log(formData);
    // window.electron.ipcRenderer.sendInsertSpecialForm(formData);
    clearForm();
  };

  const speciaFunction = [
    'സാധാരണ കുർബാന',
    'ആഘോഷമായ കുർബാന',
    'ഒപ്പീസ് പള്ളിയിൽ',
    'ഒപ്പീസ് സെമിത്തേരിയിൽ',
  ];

  return (
    <div className="ring-4 ring-bgSecondary p-10 rounded-xl">
      <TopBar />
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 py-10 px-5 text-[#236675]"
      >
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Special Form</span>
          <span className="text-xl">Invoice Number #S{invoice}</span>
        </div>
        <span className="text-xl font-bold mb-4 mt-8">Details</span>

        {/* Name */}
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col">
            <span>First Name</span>
            <input
              type="text"
              name="firstname"
              value={fname}
              placeholder="First Name"
              onChange={(e) => setFName(e.target.value)}
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <span>Last Name</span>
            <input
              type="text"
              name="lastname"
              value={lname}
              placeholder="Last Name"
              onChange={(e) => setLName(e.target.value)}
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
        </div>
        {/* Address */}
        <div className="flex flex-col">
          <span>Address</span>
          <textarea
            rows={6}
            name="address"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary resize-none"
          />
        </div>
        {/* House Name */}
        <div className="flex flex-col">
          <span>House Name</span>
          <input
            type="text"
            name="housename"
            value={house}
            placeholder="House Name"
            onChange={(e) => setHouse(e.target.value)}
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
          />
        </div>
        {/* Unit Type */}
        <div className="flex flex-col">
          <span>Unit Type</span>
          <select
            name="unittype"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
          >
            <option value="">Select Unit Type</option>
            <option value="1">Unit 1</option>
            <option value="2">Unit 2</option>
            <option value="3">Unit 3</option>
          </select>
        </div>
        {/* Date */}
        <div className="flex justify-between">
          <div className="flex flex-col w-1/2">
            <span>Issued On</span>
            <input
              type="date"
              name="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span>Booked Date</span>
            <input
              type="date"
              name="date"
              value={bookDate}
              onChange={(e) => setBookDate(e.target.value)}
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
        </div>
        {/* Invoice Items */}
        <span className="font-bold text-xl">Invoice Items</span>
        <div className="flex flex-col">
          <div className="w-full flex justify-center items-center">
            <table className="table-fixed border-separate border-spacing-4">
              <thead>
                <tr className="font-semibold">
                  <th className="w-96">Item</th>
                  <th className="w-32">Price</th>
                  <th className="w-32">Booked</th>
                  <th className="w-32">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {InvoiceItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <select
                        name="functionName"
                        value={item.functionName}
                        onChange={(e) => handleInputChange(e, item)}
                        className="p-2 w-96 rounded-lg border-2 border-black/15 bg-bgSecondary"
                      >
                        <option value="">Select Function</option>
                        {speciaFunction.map((func) => (
                          <option value={func} key={func}>
                            {func}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={item.price}
                        min={0}
                        onChange={(e) => handleInputChange(e, item)}
                        placeholder="Price"
                        className="p-2 w-32 rounded-lg border-2 border-black/15 bg-bgSecondary"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="Booked"
                        value={item.Booked}
                        min={1}
                        onChange={(e) => handleInputChange(e, item)}
                        placeholder="Booked Qty."
                        className="p-2  w-32 rounded-lg border-2 border-black/15 bg-bgSecondary"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="TotalPrice"
                        value={item.total}
                        disabled
                        placeholder="Total Price"
                        className="p-2 w-32 rounded-lg border-2 border-black/15 bg-bgSecondary"
                      />
                    </td>
                    <td>
                      <IoIosTrash
                        className="text-red-600 font-bold text-3xl"
                        onClick={() =>
                          setInvoiceItems((prevItems) =>
                            prevItems.filter((i) => i.id !== item.id),
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between px-6 md:px-20 pt-2">
            <button
              className="text-[#104972] bg-[#5BD2ED] font-bold w-fit p-2 rounded-xl"
              type="button"
              onClick={() => {
                setInvoiceItems((prevItems) => [
                  ...prevItems,
                  emptyInvoiceItem,
                ]);
              }}
            >
              + Add Item
            </button>
            <span className="text-xl text-black font-bold">
              Total Price: ₹{Total}
            </span>
          </div>
        </div>
        {/* Notes */}
        <div className="flex flex-col">
          <span>Notes</span>
          <textarea
            rows={6}
            name="notes"
            value={note}
            placeholder="Notes"
            onChange={(e) => setNote(e.target.value)}
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary resize-none"
          />
        </div>
        {/* Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="text-[#104972] bg-[#5BD2ED] font-bold w-fit p-2 rounded-xl"
          >
            Create Invoice
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form2;
