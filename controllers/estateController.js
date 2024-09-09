const admin = (req, res) =>{
    res.render('estate/admin',{
        pagina: 'Mis Propiedades',
        barra: true
    })
}

const crear = (req, res) =>{
    res.render('estate/create', {
        pagina: 'Crear Propiedad',
        barra: true
    })
}


export{
    admin,
    crear
}