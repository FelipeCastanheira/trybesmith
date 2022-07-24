import { Request, Response, NextFunction } from 'express';
import correctToken from '../utils/token';

const tokenExists = (token: boolean): boolean => !token;
const tokenIsCorrect = (token: string | undefined): string => {
  if (token && token === token[0] + correctToken) {
    return '';
  }
  return 'Invalid token';
};
const getNumber = (token: string | undefined): number => {
  if (token) {
    return Number(token[0]);
  }
  return 0;
};

const validToken = (req: Request, res: Response, next: NextFunction) => {
  if (tokenExists(!req.headers.authorization)) {
    const message = tokenIsCorrect(req.headers.authorization);
    if (message.length) {
      return res.status(401).json({ message });  
    }
    req.body.userId = getNumber(req.headers.authorization);
    return next();
  }
  return res.status(401).json({ message: 'Token not found' });
};

export default validToken;
