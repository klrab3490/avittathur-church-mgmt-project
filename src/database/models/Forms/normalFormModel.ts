import mongoose, { Schema, Document } from 'mongoose';

// Define interface for your form data
interface InvoiceItemsObject {
  id: string;
  functionName: string;
  price: number;
  Booked: number;
  total: number;
}

// Define schema for invoice items
const InvoiceItemsSchema = new Schema<InvoiceItemsObject>({
  id: String,
  functionName: String,
  price: Number,
  Booked: Number,
  total: Number,
});

interface NormalForm extends Document {
  name: string;
  invoice: string;
  address: string;
  housename: string;
  unit: string;
  formdate: Date;
  dateOfHolymass: Date;
  amount: number;
  invoiceItems: InvoiceItemsObject[];
  note: string;
}

// Define schema for the main form data
const NormalFormSchema = new Schema<NormalForm>({
  name: String,
  invoice: String,
  address: String,
  housename: String,
  unit: String,
  formdate: Date,
  dateOfHolymass: Date,
  amount: Number,
  note: String,
  invoiceItems: [InvoiceItemsSchema], // Embedding invoice items schema
});

// Create and export the model
const NormalFormModel = mongoose.model<NormalForm>(
  'NormalForm',
  NormalFormSchema,
);

export default NormalFormModel;
