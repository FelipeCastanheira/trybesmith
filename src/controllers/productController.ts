import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };

  public addOne = async (req: Request, res: Response) => {
    const product = await this.productService.addOne(req.body);
    res.status(201).json(product);
  };
}

export default ProductController;
