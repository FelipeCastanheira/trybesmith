import express from 'express';
import ProductController from './controllers/productController';
import UserController from './controllers/userController';
import OrderController from './controllers/orderController';
import validClasse from './middlewares/validClasse';
import validLevel from './middlewares/validLevel';
import validPassword from './middlewares/validPassword';
import validProduct from './middlewares/validProduct';
import validUsername from './middlewares/validUsername';
import validToken from './middlewares/validToken';
import validProducts from './middlewares/validProducts';

const app = express();

app.use(express.json());

const product = new ProductController();
const order = new OrderController();
const user = new UserController();

app.get('/products', product.getAll);
app.post('/products', validProduct.validName, validProduct.validAmount, product.addOne);
app.post('/users', validUsername, validClasse, validLevel, validPassword, user.addOne);
app.post('/login', validUsername, validPassword, user.login);
app.get('/orders', order.getAll);
app.post('/orders', validToken, validProducts, order.addOne);

export default app;
