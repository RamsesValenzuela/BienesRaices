import express from 'express';
import csurf from 'csurf'; 
import cookieParser from 'cookie-parser';
import bodyparser from 'body-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import estateRoutes from './routes/estateRoutes.js'
import db from './config/db.js';


const app = express();


//habilitar bodyparser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//Habilitar lectura de datos
app.use(express.urlencoded({ extended: true}));


//habiliatar cookie parser
app.use(cookieParser())

//habilitar CSRF
app.use(csurf({cookie:true}))



try{
    await db.authenticate();
    db.sync();
    console.log("Se ha conectado a al base de datos"); 
}catch(error){
    console.log(error);
}

//Habilitar las vistas. 
app.set('view engine', 'pug');
app.set('views', './views');

//carpeta publica
app.use(express.static('public'));

//routing 
app.use('/auth', usuarioRoutes);
app.use('/', estateRoutes)

app.use(express.json());





//Definir un puerto
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});