import db from '../config/db.js'
import { validationResult } from 'express-validator'
import Price from '../models/Price.js'
import Category from '../models/Category.js'



const admin = (req, res) =>{
    res.render('estate/admin',{
        pagina: 'Mis Propiedades',
        barra: true
    })
}

const crear =  async (req, res) =>{

    //consultar modelo de Precio y Categorias
    const [categorys, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ])

    res.render('estate/create', {
        pagina: 'Crear Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorys,
        prices

    })
}

const saveEstate = async(req, res) =>{
    //Validacion
    let result = validationResult(req)



    if(!result.isEmpty()){

        const [categorys, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll(),
        ])


        return  res.render('estate/create', {
            pagina: 'Crear Propiedad',
            barra: true,
            categorys,
            prices,
            errores: result.array()
    
        })
    }
}


export{
    admin,
    crear,
    saveEstate
}