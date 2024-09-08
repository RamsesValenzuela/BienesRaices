import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js"

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password, salt)
        }
    },
})

// Metodos personalizados 
Usuario.prototype.passwordValidator = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default Usuario