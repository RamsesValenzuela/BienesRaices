import jwt from 'jsonwebtoken'

const generateJWT = datos => jwt.sign({ id: datos.id, nombre:datos.nombre },process.env.SECRETWORD, { expiresIn: '1d' })



const generateId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

export {
    generateJWT,
    generateId
}