import categorias from './Categorys.js'
import Category from '../models/Category.js'
import Price from '../models/Price.js'
import prices from './Prices.js'
import db from '../config/db.js';

const importData = async() =>{
    try{
        //authenticar en la base de datos
        await db.authenticate()

        //generar las columnas 
        await db.sync()
        //insertamos los datos
        await Promise.all([
            Category.bulkCreate(categorias),
            Price.bulkCreate(prices)
        ])

        console.log('Datos importados correctamente')
        process.exit()


    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async()=>{
    try {
        await db.sync({force:true})
        console.log("Datos eliminados correctamente")
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

if(process.argv[2] === "-i"){
    importData() 
}

if(process.argv[2] === "-e"){
    deleteData();
}