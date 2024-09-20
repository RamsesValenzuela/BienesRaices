import jwt from 'jsonwebtoken'
import  Usuario   from '../models/Usuario.js'

const protectPath = async (req, res, next) =>{
    console.log('Desde el middleware')

    //verificar si hay un token
    const {_token} = req.cookies

    if(!_token){
        return res.redirect('/auth/login')
    }


    try {
        
        const decoded = jwt.verify(_token, process.env.SECRETWORD)
        const user = await Usuario.scope('deletePassword').findByPk(decoded.id)
        
       //Almacenar el usuario al Req
       if(user){
            req.usuario = user
       }else{
            return res.redirect('/auth/login')
       }
       
       return next()

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }
    //comprobar el token
    next()
}

export default protectPath