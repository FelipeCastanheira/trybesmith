import IProduct from '../interfaces/iProduct';
import connection from '../models/connection';
import ProductModel from '../models/productModel';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async addOne(product: IProduct): Promise<IProduct> {
    const products = await this.model.getAll();
    const id: number = products.length + 1;
    await this.model.addOne(product);
    return { ...product, id };
  }
}

export default ProductService;
