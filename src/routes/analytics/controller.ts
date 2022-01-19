import { Request, Response } from 'express';
import Transaction from '../../model/Transaction';
import { IUser } from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getExpenseByCategory = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const { currentUser } = request;
  const expense: any = await Transaction.aggregate([
    {
      $match: { user: currentUser._id, type: 'EXPENSE' },
    },
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
      },
    },
  ]).catch((err) => handleError(response, err));
  const label = expense.map((exp) => exp._id);
  const value = expense.map((exp) => exp.totalAmount);
  return handleSuccess(response, { label, value });
};

export const getExpenseByDate = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const { currentUser } = request;
  const expense: any = await Transaction.aggregate([
    {
      $match: { user: currentUser._id, type: 'EXPENSE' },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        amount: { $sum: '$amount' },
      },
    },
  ]).catch((err) => handleError(response, err));
  // const label = expense.map((exp) => exp._id);
  // const value = expense.map((exp) => exp.totalAmount);
  return handleSuccess(response, { expense });
};
