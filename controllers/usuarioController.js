import { check, validationResult } from 'express-validator';
import Usuario from '../models/usuario.js';
import {generateId} from '../helper/tokes.js';
import {regiterEmail} from '../helper/emails.js';

const formularioLogin = (req, res) =>{
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}



const formularioRegistro = (req, res) =>{
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
    })
}

const registrar = async (req, res) =>{
    
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no es un email').run(req)
    await check('password').isLength({min: 6}).withMessage('El password debe de ser minimo 6 caracteres').run(req)
    //await check('repetir_password').equals('password').withMessage('los password no son iguales').run(req)

    let resultado = validationResult(req)


    
    //verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        //errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
        
    }

    //Extraer los datos 
    const {nombre, email, password} = req.body

    //Verifica que el usuario exista en la base de datos
    const userExists = await Usuario.findOne({where: {email: email}})
    if(userExists){
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg:'El usuario ya esta registrado'}],
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })
        
    }

    //Almacenar el usuario
    const user = await Usuario.create({
        nombre, 
        email, 
        password,
        token: generateId()
    });

    regiterEmail({
        user: user.nombre,
        email:  user.email,
        token: user.token,
    })


    res.render('plantillas/message', {
        pagina: 'Cuenta creada correctamente',
        mensaje:'Se ha enviado un correo de confirmacion de cuenta'
    });

}

const confirmar = (req, res) => {
    
    const {token} = req.params

    console.log(token)

    //verificar si el token es valido 
     

    //confirmar cuenta
    
}

const formularioOlvidePassword = (req, res) =>{
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a bienes raices'
    })
}

export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar
}