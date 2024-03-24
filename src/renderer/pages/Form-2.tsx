import TopBar from '../components/TopBar';

function Form2() {
  const number = Math.floor(Math.random() * 1000000);
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
        <div className="felx flex-col font-bold text-xl">Invoice Items</div>
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
