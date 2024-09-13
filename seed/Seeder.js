import categorias from './Categorys.js'
import Category from '../models/Category.js'
import db from '../config/db.js';

const importData = async() =>{
    try{
        //authenticar en la base de datos
        await db.authenticate()

        //generar las columnas 
        await db.sync()
        //insertamos los datos
        await Category.bulkCreate(categorias)
        console.log('Datos importados correctamente')
        process.exit()

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === "-i"){
    importData() 
}