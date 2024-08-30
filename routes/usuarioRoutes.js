import express, { Router } from "express";
import { formularioLogin, formularioOlvidePassword, formularioRegistro, registrar, 
    confirmar, resetPassword, tokenValidator, newPassword} from "../controllers/usuarioController.js";

const routes = express.Router()
//routing
routes.get('/login', formularioLogin);

routes.get('/registro', formularioRegistro);
routes.post('/registro', registrar);

routes.get('/confirmar/:token', confirmar);

routes.get('/olvide-Password', formularioOlvidePassword);

routes.post('/olvide-Password', resetPassword);


//almacena el nuevo password
routes.get('/olvide-Password/:token', tokenValidator)
routes.post('/olvide-Password/:token', newPassword)


export default routes
