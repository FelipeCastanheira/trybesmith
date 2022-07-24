import { Request, Response, NextFunction } from 'express';

const levelExists = (level?: string | number): boolean => !!level || level === 0;
const validLevelType = (level?: string | number): string => {
  if (typeof level === 'number') {
    if (level > 0) {
      return '';
    }
    return '"level" must be greater than or equal to 1';
  }
  return '"level" must be a number';
};

const validLevel = (req: Request, res: Response, next: NextFunction) => {
  if (levelExists(req.body.level)) {
    const message = validLevelType(req.body.level);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"level" is required' });
};

export default validLevel;
