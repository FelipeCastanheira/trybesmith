import { Request, Response, NextFunction } from 'express';

const nameExists = (username?: string | number): boolean => !!username;
const validNameType = (username?: string | number): string => {
  if (typeof username === 'string') {
    if (username.length > 2) {
      return '';
    }
    return '"username" length must be at least 3 characters long';
  }
  return '"username" must be a string';
};

const validUsername = (req: Request, res: Response, next: NextFunction) => {
  if (nameExists(req.body.username)) {
    const message = validNameType(req.body.username);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"username" is required' });
};

export default validUsername;
