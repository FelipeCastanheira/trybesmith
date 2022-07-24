import { Request, Response } from 'express';
import UserService from '../services/userService';
import token from '../utils/token';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const result = await this.userService.getUser(req.body);
    if (result.length) {
      return res.status(200).json({ token: `${result[0].id}${token}` });
    }
    return res.status(401).json({ message: 'Username or password invalid' });
  };

  public addOne = async (req: Request, res: Response) => {
    await this.userService.addOne(req.body);
    res.status(201).json({ token });
  };
}

export default UserController;
