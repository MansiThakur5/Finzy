/**
 * @file expenseController.ts
 * @description CRUD operations for user transactions (both income and expenses).
 *
 * All routes in this controller are protected — they require a valid JWT
 * via `authMiddleware`. Transactions are always scoped to the authenticated user.
 *
 * Transaction types:
 *  - 'expense' — money going out (Food, Transport, Bills, etc.)
 *  - 'income'  — money coming in (Salary, Freelance, etc.)
 */

import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Expense from '../models/Expense';

/**
 * @route   GET /api/expenses
 * @desc    Retrieve all transactions for the authenticated user, sorted by date descending
 * @access  Private
 */
export const getExpenses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @route   POST /api/expenses
 * @desc    Create a new income or expense transaction
 * @access  Private
 *
 * @body    { type, title, amount, category, date }
 *          type defaults to 'expense' if not provided
 */
export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, title, amount, category, date } = req.body;

    const expense = new Expense({
      user: req.user._id,
      type: type || 'expense',
      title,
      amount,
      category,
      date: date || Date.now(),
    });

    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete a transaction by ID — only the owner can delete their own records
 * @access  Private
 */
export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);

    // Ownership check: ensure the transaction belongs to the requesting user
    if (expense && expense.user.toString() === req.user._id.toString()) {
      await expense.deleteOne();
      res.json({ message: 'Expense removed' });
    } else {
      res.status(404).json({ message: 'Expense not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
