import { Request, Response, NextFunction } from 'express';

const propExists = (notProductsIds?: boolean): boolean => !notProductsIds;
const validPropType = (isArray: boolean): string => {
  if (isArray) {
    return '';
  }
  return '"productsIds" must be an array';
};

const validProducts = (req: Request, res: Response, next: NextFunction) => {
  if (propExists(!req.body.productsIds)) {
    const message = validPropType(Array.isArray(req.body.productsIds));
    if (message.length) {
      return res.status(422).json({ message });  
    }
    if (req.body.productsIds.length) {
      return next();
    }
    return res.status(422).json({
      message: '"productsIds" must include only numbers',
    });
  }
  return res.status(400).json({ message: '"productsIds" is required' });
};

export default validProducts;
