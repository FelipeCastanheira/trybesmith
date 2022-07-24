import { Request, Response, NextFunction } from 'express';

const nameExists = (name?: string | number): boolean => !!name;
const validNameType = (name?: string | number): string => {
  if (typeof name === 'string') {
    if (name.length > 2) {
      return '';
    }
    return '"name" length must be at least 3 characters long';
  }
  return '"name" must be a string';
};

const amountExists = (amount?: string | number): boolean => !!amount;
const validAmountType = (amount?: string | number): string => {
  if (typeof amount === 'string') {
    if (amount.length > 2) {
      return '';
    }
    return '"amount" length must be at least 3 characters long';
  }
  return '"amount" must be a string';
};

const validName = (req: Request, res: Response, next: NextFunction) => {
  if (nameExists(req.body.name)) {
    const message = validNameType(req.body.name);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"name" is required' });
};

const validAmount = (req: Request, res: Response, next: NextFunction) => {
  if (amountExists(req.body.amount)) {
    const message = validAmountType(req.body.amount);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"amount" is required' });
};

const validProduct = { validName, validAmount };

export default validProduct;
