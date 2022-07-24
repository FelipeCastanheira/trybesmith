import { Pool } from 'mysql2/promise';
import User from '../interfaces/iUser';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async addOne(user: User): Promise<string> {
    await this.connection.execute(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
      [user.username, user.classe, user.level, user.password],
    );
    return 'adicionado';
  }
}
