import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  constructor(private order = new OrderService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.order.getAll();
    res.status(200).json(orders);
  };

  public addOne = async (req: Request, res: Response) => {
    const userID: number = req.body.userId;
    await this.order.addOne(userID, req.body.productsIds);
    res.status(201).json({
      userId: userID,
      productsIds: req.body.productsIds,
    });
  };
}

export default OrderController;
