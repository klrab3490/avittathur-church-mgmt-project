import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';

interface InvoiceItemsObject {
  id: string;
  churchName: string;
  price: number;
  Booked: number;
  total: number;
}

function Form2() {
  const number = Math.floor(Math.random() * 1000000);
  const emptyInvoiceItem = {
    id: crypto.randomUUID().toString(),
    churchName: '',
    price: 10,
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
      ...invoiceItem,
      total: invoiceItem.price * invoiceItem.Booked,
    }));
    const totalAmount = updatedItems.reduce((acc, { total }) => acc + total, 0);

    // Only update state if the total has changed
    if (totalAmount !== Total) {
      setTotal(totalAmount);
      setInvoiceItems(updatedItems);
    }
  }, [InvoiceItems, Total]);

  // Function for handling inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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
  return (
    <div className="ring-4 ring-bgSecondary p-10 rounded-xl">
      <TopBar />
      <form className="flex flex-col gap-3 py-10 px-5 text-[#236675]">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Special Form</span>
          <span className="text-xl">Invoice Number #N{number}</span>
        </div>
        <span className="text-xl font-bold mb-4 mt-8">Details</span>

        {/* Name */}
        <div className="flex justify-between">
          <div className="w-1/2 flex flex-col">
            <span>First Name</span>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <span>Last Name</span>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
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
            placeholder="Address"
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary resize-none"
          />
        </div>
        {/* House Name */}
        <div className="flex flex-col">
          <span>House Name</span>
          <input
            type="text"
            name="housename"
            placeholder="House Name"
            className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
          />
        </div>
        {/* Unit Type */}
        <div className="flex flex-col">
          <span>Unit Type</span>
          <select
            name="unittype"
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
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span>Booked Date</span>
            <input
              type="date"
              name="date"
              className="w-3/4 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            />
          </div>
        </div>
        {/* Invoice Items */}
        {/* Invoice Items */}
        <span className="font-bold text-xl">Invoice Items</span>
        <div className="px-6 md:px-16 grid gap-3">
          {/* <span>Holy Mass Type</span>
          <div className="flex flex-col">
            <select
              name="HolyMassType"
              className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
            >
              <option value="" defaultChecked disabled>
                Select Holy Mass Type
              </option>
              <option value="1">Normal</option>
              <option value="2">Special</option>
            </select>
          </div> */}
          <div className="grid grid-cols-6 gap-2 md:gap-20 my-2 font-semibold">
            <span className="col-span-2">Item</span>
            <span className="col-start-3">Price</span>
            <span className="col-start-4">Booked</span>
            <span className="col-start-5">Total Price</span>
          </div>
          <div>
            {InvoiceItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 md:gap-20 grid-cols-6 my-2"
              >
                <input
                  type="text"
                  name="churchName"
                  value={item.churchName}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder="Function Name"
                  className="col-span-2 p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />{' '}
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  min={0}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder="Price"
                  className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />{' '}
                <input
                  type="number"
                  name="Booked"
                  value={item.Booked}
                  min={1}
                  onChange={(e) => handleInputChange(e, item)}
                  placeholder="Booked Qty."
                  className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />{' '}
                <input
                  type="number"
                  name="TotalPrice"
                  value={item.total}
                  disabled
                  placeholder="Total Price"
                  className="p-2 rounded-lg border-2 border-black/15 bg-bgSecondary"
                />
                <div className="flex justify-center items-center text-red-600 font-bold text-3xl">
                  <button
                    type="button"
                    onClick={() =>
                      setInvoiceItems((prevItems) =>
                        prevItems.filter((i) => i.id !== item.id),
                      )
                    }
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pr-6 md:pr-20">
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
            placeholder="Notes"
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
