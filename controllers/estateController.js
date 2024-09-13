import db from '../config/db.js'
import Price from '../models/Price.js'
import Category from '../models/Category.js'
import { promises } from 'nodemailer/lib/xoauth2'


const admin = (req, res) =>{
    res.render('estate/admin',{
        pagina: 'Mis Propiedades',
        barra: true
    })
}

const crear =  async (req, res) =>{

    //consultar modelo de Precio y Categorias
    const [categorys, prices] = await promises.all([
        Category.findAll(),
        Price.findAll(),
    ])

    res.render('estate/create', {
        pagina: 'Crear Propiedad',
        barra: true,
        categorys,
        prices

    })
}


export{
    admin,
    crear
}