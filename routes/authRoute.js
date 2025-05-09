import { Router } from "express";
import controller from "../controllers/authController.js";
import { check } from "express-validator";
import authMiddleware from "../midlleware/authMiddleware.js";
import roleMiddleware from "../midlleware/roleMiddleware.js";

const router = Router()



router.post('/reg', [
    check('username', 'имя пользователя не может быть пустым').notEmpty(),
    check('password', 'пароль должен быть больше 4 и меньше 10 символов').isLength({min:4, max:10}),

],controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["USER", "ADMIN"]), controller.getUsers)




export default router
