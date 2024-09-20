import express from 'express'
import { body } from 'express-validator'
import {admin, crear, saveEstate} from '../controllers/estateController.js'
import protectPath from '../middleware/ProtectPath.js'
 
const router = express.Router()

router.get('/mis_propiedades', protectPath, admin)
router.get('/propiedades/crear', crear)
router.post('/propiedades/crear',
    protectPath, 
    body('title').notEmpty().withMessage('El Titulo Del Anuncio Es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción Del Anuncio Es Obligatorio')
        .isLength({max: 250}).withMessage('La Description es demasiado larga'),
    body('category').isNumeric().withMessage('Selecciona una categoria'),
    body('price').isNumeric().withMessage('Selecciona un rango de precios'),
    body('roomQty').isNumeric().withMessage('Selecciona las habitaciones'),
    body('garage').isNumeric().withMessage('Selecciona el numero de estacionamiento'),
    body('wc').isNumeric().withMessage('Selecciona el numero de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    






    saveEstate)


export default router