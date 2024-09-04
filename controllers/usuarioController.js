import { check, validationResult } from 'express-validator';
import Usuario from '../models/usuario.js';
import { generateId } from '../helper/tokes.js';
import { regiterEmail, passwordReset } from '../helper/emails.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}



const formularioRegistro = (req, res) => {
    console.log(req.csrfToken())
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
    })
}

const registrar = async (req, res) => {

    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no es un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe de ser minimo 6 caracteres').run(req)
    //await check('repetir_password').equals('password').withMessage('los password no son iguales').run(req)

    let resultado = validationResult(req)



    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        //errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
            }
        })

    }

    //Extraer los datos 
    const { nombre, email, password } = req.body

    //Verifica que el usuario exista en la base de datos
    const userExists = await Usuario.findOne({ where: { email: email } })
    if (userExists) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario ya esta registrado' }],
            usuario: {
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
        email: user.email,
        token: user.token,
    })


    res.render('plantillas/message', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Se ha enviado un correo de confirmacion de cuenta'
    });

}

const confirmar = async (req, res) => {

    const { token } = req.params

    console.log(token)

    //verificar si el token es valido 

    const user = await Usuario.findOne({ where: { token } })

    console.log(user)

    if (!user) {
        return res.render('auth/accountConfirm', {
            pagina: 'Error al confirmar cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta',
            error: true
        })
    }

    //confirmar cuenta
    user.token = null;
    user.confirmado = true

    await user.save();
    return res.render('auth/accountConfirm', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmo correctamente',
        error: false
    })

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a bienes raices',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async (req, res) => {

    //validacion
    await check('email').isEmail().withMessage('Eso no es un email').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        //errores
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a bienes raices',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),



        })
    }

    //buscar al usuario si existe en la base de datos
    const { email } = req.body

    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recupera tu acceso a bienes raices',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El Email no esta ligado a ningun usuario' }],
        })
    }

    //generar el token y enviar el email
    usuario.token = generateId()
    await usuario.save();


    //enviar un email 
    passwordReset({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    })

    //renderizar un mensaje 
    res.render('plantillas/message', {
        pagina: 'Reestablece tu password',
        mensaje: 'Se ha enviado un correo con las instrucciones'
    });

}

const tokenValidator = async (res, req) =>{ 

    const {token} = req.params
    
    const user = await Usuario.findOne({where: {token}})

    if(!user){
       return  res.render('auth/accountConfirm', {
            pagina: 'Reestablece tu password',
            mensaje: 'Hubo un error al validar tu información',
            error: true
        });
    }

    //mostrar formulario para modificar password
    res.render('auth/resetPassword',{
        pagina: 'restablece tu password',
        
    })
}


const newPassword = (res, req) =>{

}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar,
    resetPassword,
    tokenValidator,
    newPassword
}