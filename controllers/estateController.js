import db from '../config/db.js'
import { validationResult } from 'express-validator'
import {Price, Category, Estate } from '../models/index.js'


const admin = async (req, res) =>{

    const {id} = req.user

    const propiedades = await Estate.findAll({
        where:{
            UsuarioId : id
        },
        include : [
            {model: Category, as:'category'},
            {model: Price, as: 'price'}
        ]
    })

    res.render('estate/admin',{
        pagina: 'Mis Propiedades',
        propiedades,

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


const addImage = async  (req,res) =>{
   
    const {id} = req.params

   //validar que la propiedad exista

   const prop = await Estate.findByPk(id)

   if(!prop){
    return res.redirect('/mis_propiedades')
   }

   //validar que la propiedad no este publicada 
   if(prop.published){
    return res.redirect('/mis_propiedades')
   }

   //validar que la propiedad le pertenece a quien visita esta pagina
   if(req.user.id.toString() !== prop.UsuarioId.toString()){
        res.redirect('/mis_propiedades')
   }


   
    res.render('estate/addImage', {
        pagina: `Agregar Imagen ${prop.title}`,
        csrfToken: req.csrfToken(),
        prop
    })
}

const storageImage = async (req, res, next) =>{
  
    const {id} = req.params

    //validar que la propiedad exista
 
    const prop = await Estate.findByPk(id)
 
    if(!prop){
     return res.redirect('/mis_propiedades')
    }
 
    //validar que la propiedad no este publicada 
    if(prop.published){
     return res.redirect('/mis_propiedades')
    }
 
    //validar que la propiedad le pertenece a quien visita esta pagina
    if(req.user.id.toString() !== prop.UsuarioId.toString()){
         res.redirect('/mis_propiedades')
    }


    try {
        
        console.log(req.file.filename)
        
        
        //almacenar la imagen y publicar propiedad
        prop.imagen = req.file.filename

        prop.published = 1

        await prop.save()

        next()

    } catch (error) {
        console.log(error)
    }

}

const editPropiety = async (req, res) => {
    
    const {id} = req.params

    const propiedad= await Estate.findByPk(id)

    if(!propiedad){
        return res.redirect('/mis_propiedades')
    }
    
    //revisar que este autorizado la persona que visita la url
    if(propiedad.UsuarioId.toString() !== req.user.id.toString()){
        return res.redirect('/mis_propiedades')
    }


    const [categorys, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
    ])

    res.render('estate/update', {
        pagina: 'Editar Propiedad',
        barra: true,
        csrfToken: req.csrfToken(),
        categorys,
        prices,
        datos: []

    })
}

export{
    admin,
    crear,
    saveEstate,
    addImage,
    storageImage,
    editPropiety
}