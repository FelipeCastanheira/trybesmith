import FullOrder from '../interfaces/fullOrder';
import IProduct from '../interfaces/iProduct';
import connection from '../models/connection';
import OrderModel from '../models/orderModel';
import ProductModel from '../models/productModel';

class OrderService {
  public model: OrderModel;

  public product: ProductModel;

  constructor() {
    this.product = new ProductModel(connection);
    this.model = new OrderModel(connection);
  }
  
  public async getAll(): Promise<FullOrder[]> {
    const products = await this.product.getAll();
    const orders = await this.model.getAll();
    const allOrders: FullOrder[] = orders.map(({ id, userId }) => {
      const onlyProducts = (product: IProduct) => product.id;
      const order = {
        id,
        userId,
        productsIds: products.filter((product: IProduct) => product.orderId === id)
          .map(onlyProducts),
      };
      return order;
    });
    return allOrders;
  }

  public async addOne(userId: number, productsIds: number[]): Promise<string> {
    const orders = await this.model.getAll();
    const orderId: number = orders.length + 1;
    await this.model.addOne(userId);
    const promises = productsIds.map((id) => this.product.put(id, orderId));
    await Promise.all(promises);
    return 'pedido adicionado!';
  }
}

export default OrderService;
