import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  category: string;
  date: Date;
}

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, enum: ['income', 'expense'], default: 'expense' },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;
