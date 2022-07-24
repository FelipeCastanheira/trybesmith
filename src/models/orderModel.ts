import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/iOrder';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Orders');
    const [rows] = result;
    return rows as IOrder[];
  }
  
  public async addOne(userId: number): Promise<string> {
    await this.connection.execute(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?);',
      [userId],
    );
    return 'adicionado';
  }
}
