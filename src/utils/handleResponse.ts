import { Response } from 'express';

export const handleSuccess = (response: Response, data: any) => {
  response.status(200).json({ status: 200, data });
};

export const handleError = (response: Response, error: any) => {
  const message = error.message ?? '';
  response.status(400).json({ status: 400, error, message });
};
