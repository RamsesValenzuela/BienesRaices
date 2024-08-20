import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';


const app = express();


//Habilitar lectura de datos
app.use(express.urlencoded({ extended: true}));

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





//Definir un puerto
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});