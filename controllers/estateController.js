import db from '../config/db.js'
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
        categorys,
        prices

    })
}


export{
    admin,
    crear
}