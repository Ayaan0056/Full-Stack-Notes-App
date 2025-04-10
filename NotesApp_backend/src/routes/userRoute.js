import express from 'express';
import { userRegister } from '../controller/user/userRegister.js';
import { userValidation } from '../middleware/userValidation.js';
import { userValidationSchema } from '../validators/userValidation.js';
import { userLogin } from '../controller/user/userLogin.js';
import { userLogout } from '../controller/user/userLogout.js';
import { getUsers } from '../controller/user/getUsers.js';
import { verifyToken } from '../middleware/verifyToken.js';


const userRoute = express.Router();

userRoute.post('/register', userValidation(userValidationSchema) ,userRegister);
userRoute.post('/login', userLogin);
userRoute.delete('/logout', userLogout);
userRoute.get('/fetchUsers', getUsers)
userRoute.get('/verify', verifyToken)
export default userRoute;