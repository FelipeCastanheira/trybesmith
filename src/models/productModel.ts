// product model

import { Pool } from 'mysql2/promise';
import IProduct from '../interfaces/iProduct';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async addOne(product: IProduct): Promise<string> {
    await this.connection.execute(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
      [product.name, product.amount],
    );
    return 'adicionado';
  }
  
  public async put(id: number, orderId: number): Promise<string> {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;',
      [orderId, id],
    );
    return 'adicionado';
  }
}
