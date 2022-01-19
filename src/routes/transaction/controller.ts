import { Request, Response } from 'express';
import Transaction from '../../model/Transaction';
import { IUser } from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getAllTransaction = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const {
    currentUser,
    params: { page, size },
  } = request;
  console.log(`page`, page);
  console.log(`size`, size);
  const transaction: any = await Transaction.find({ user: currentUser._id })
    .sort({ createdAt: 'desc' })
    .limit(+size * 1)
    .skip((+page - 1) * +size)
    .lean()
    .catch((err) => handleError(response, err));
  const count = await Transaction.countDocuments();

  return handleSuccess(response, { transaction, count });
};

export const createTransaction = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  try {
    const { body, currentUser } = request;
    console.log('create transaction');
    const transactionDoc = await Transaction.create({
      ...body,
      user: currentUser._id,
    });
    return handleSuccess(response, { ...transactionDoc.toJSON() });
  } catch (error) {
    return handleError(response, error);
  }
};

export const deleteSingleTransaction = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  try {
    const {
      currentUser,
      params: { transactionId },
    } = request;
    const transactionDoc = await Transaction.remove({
      _id: transactionId,
      user: currentUser._id,
    });
    console.log(`transactionDoc`, transactionDoc);
    return handleSuccess(response, 'Successfully deleted');
  } catch (error) {
    return handleError(response, error);
  }
};

export const getTotalData = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  try {
    const { currentUser } = request;
    const transactionList = await Transaction.find({ user: currentUser._id });
    let totalExpense = 0;
    let totalIncome = 0;
    transactionList.forEach((txn: any) => {
      if (txn.type === 'INCOME') {
        totalIncome = totalIncome + txn.amount;
      } else {
        totalExpense = totalExpense + txn.amount;
      }
    });
    return handleSuccess(response, {
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
    });
  } catch (error) {
    return handleError(response, error);
  }
};
