import {DataTypes} from 'sequelize'
import db from '../config/db.js'


const Estate = db.define('estate',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    roomQty:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    garage:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    wc:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    street:{
        type:DataTypes.STRING(60),
        allowNull:false
    },
    lat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lng:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    published:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }

})

export default Estate