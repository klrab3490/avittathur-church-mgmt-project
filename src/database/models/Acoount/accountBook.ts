/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

interface AccountBook extends Document {
    vicar: number,
    kapaya: number,
    choir: number,
    alter: number,
    chruch: number,
    total: number,
    formId: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

const AccountBookSchema = new Schema<AccountBook>({
    vicar: { type: Number, required: true },
    kapaya: { type: Number, required: true },
    choir: { type: Number, required: true },
    alter: { type: Number, required: true },
    chruch: { type: Number, required: true },
    total: { type: Number, required: true },
    formId: { type: Schema.Types.ObjectId, ref: 'NormalForm', required: true }, 
  }, {
    timestamps: true, 
  });

const AccountBookModel = mongoose.model<AccountBook>('AccountBook', AccountBookSchema);

export default AccountBookModel;
