import express, { Router } from "express";
import { formularioLogin, formularioOlvidePassword, formularioRegistro, registrar, 
    confirmar } from "../controllers/usuarioController.js";

const routes = express.Router()
//routing
routes.get('/login', formularioLogin);

routes.get('/registro', formularioRegistro);
routes.post('/registro', registrar);

routes.get('/confirmar/:token', confirmar);

routes.get('/olvide-Password', formularioOlvidePassword);


export default routes
