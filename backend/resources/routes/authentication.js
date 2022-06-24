import Router from "express-promise-router";
import authController from "../controllers/authentication.js";

const authRouter = Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
authRouter.route("/forgot_password").post(authController.forgotPassword);
authRouter.route("/change_password").post(authController.changePassword);
export default authRouter;
