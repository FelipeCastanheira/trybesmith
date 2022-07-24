import { Request, Response, NextFunction } from 'express';

const nameExists = (password?: string | number): boolean => !!password;
const validNameType = (password?: string | number): string => {
  if (typeof password === 'string') {
    if (password.length > 7) {
      return '';
    }
    return '"password" length must be at least 8 characters long';
  }
  return '"password" must be a string';
};

const validPassword = (req: Request, res: Response, next: NextFunction) => {
  if (nameExists(req.body.password)) {
    const message = validNameType(req.body.password);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"password" is required' });
};

export default validPassword;
