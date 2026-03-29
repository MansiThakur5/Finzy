/**
 * @file analyticsController.ts
 * @description Aggregates financial data for the authenticated user's dashboard.
 *
 * Returns a summary payload used by the frontend Dashboard and chart components:
 *  - totalIncome, totalSpent, currentBalance
 *  - categoryData: spending broken down by category (used by doughnut chart)
 *  - totalExpenses: count of expense-type transactions
 *  - totalTransactions: total count of all records
 *
 * TODO (Phase 4): Add monthly aggregation pipeline for time-series line chart data.
 * TODO (Phase 4): Add weekly breakdown endpoint for bar chart granularity.
 */

import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Expense from '../models/Expense';

/**
 * @route   GET /api/analytics/summary
 * @desc    Get a financial summary for the authenticated user
 * @access  Private
 *
 * @returns {Object} Summary containing balance, income, spending totals,
 *                   and a category breakdown map.
 */
export const getAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expenses = await Expense.find({ user: req.user._id });

    let totalIncome = 0;
    let totalSpent = 0;

    // Accumulate totals and build category-wise expense map
    const categoryData: Record<string, number> = {};
    expenses.forEach(expense => {
      if (expense.type === 'income') {
        totalIncome += expense.amount;
      } else {
        totalSpent += expense.amount;
        categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
      }
    });

    res.json({
      totalIncome,
      totalSpent,
      currentBalance: totalIncome - totalSpent,
      categoryData,
      totalExpenses: expenses.filter(e => e.type === 'expense').length,
      totalTransactions: expenses.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
