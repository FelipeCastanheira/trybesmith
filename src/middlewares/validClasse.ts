import { Request, Response, NextFunction } from 'express';

const classeExists = (classe?: string | number): boolean => !!classe;
const validClasseType = (classe?: string | number): string => {
  if (typeof classe === 'string') {
    if (classe.length > 2) {
      return '';
    }
    return '"classe" length must be at least 3 characters long';
  }
  return '"classe" must be a string';
};

const validClasse = (req: Request, res: Response, next: NextFunction) => {
  if (classeExists(req.body.classe)) {
    const message = validClasseType(req.body.classe);
    if (message.length) {
      return res.status(422).json({ message });  
    }
    return next();
  }
  return res.status(400).json({ message: '"classe" is required' });
};

export default validClasse;
