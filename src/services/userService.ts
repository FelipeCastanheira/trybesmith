import ILogin from '../interfaces/iLogin';
import User from '../interfaces/iUser';
import connection from '../models/connection';
import UserModel from '../models/userModel';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getUser(login: ILogin): Promise<User[]> {
    const users = await this.model.getAll();
    const getByLogin = (user: User) => user.username === login.username
      && user.password === login.password;
    const myUser = users.filter(getByLogin);
    return myUser;
  }

  public async addOne(user: User): Promise<User> {
    await this.model.addOne(user);
    return user;
  }
}

export default UserService;
