import db from '../config/db.js'
import { validationResult } from 'express-validator'
import {Price, Category, Estate } from '../models/index.js'


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
        prices,
        datos: []

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
            csrfToken: req.csrfToken(),
            categorys,
            prices,
            errores: result.array(),
            datos: req.body
    
        })
    }

    //crear registro

    const {title, description, roomQty, garage, wc, street, lat, lng, category:categoryId, price:priceId, } = req.body
    
    console.log(req.user)

    const {id: UsuarioId} = req.user

    try {
        const savePropiety = await Estate.create({
           title, 
           description,
           roomQty,
           garage,
           wc, 
           street,
           lat,
           lng, 
           priceId,
           categoryId,
           UsuarioId,
           imagen: ''

        })

        const  {id} = savePropiety

            res.redirect('/propiedades/agregar-imagen/${id}')

    } catch (error) {
        console.log(error)
    }

}


export{
    admin,
    crear,
    saveEstate
}