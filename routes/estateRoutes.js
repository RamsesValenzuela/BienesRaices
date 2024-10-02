import express, { Router } from 'express'
import { body } from 'express-validator'
import {admin, crear, saveEstate, addImage, storageImage, editPropiety, saveUpdate, deleteEstate} from '../controllers/estateController.js'
import protectPath from '../middleware/ProtectPath.js'
import upload from '../middleware/UploadImage.js'
 
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

router.get('/propiedades/agregar-imagen/:id',
    protectPath, 
    addImage)

router.post('/propiedades/agregar-imagen/:id',
    protectPath,
    upload.single('image'),
    storageImage
)

router.get('/propiedades/editar/:id', 
    protectPath,
    editPropiety
)

router.post('/propiedades/editar/:id',
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
    saveUpdate)

router.post('/propiedades/eliminar/:id', 
    protectPath,    
    deleteEstate )

export default router