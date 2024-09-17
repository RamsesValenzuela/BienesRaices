import express from 'express'
import { body } from 'express-validator'
import {admin, crear, saveEstate} from '../controllers/estateController.js'

const router = express.Router()

router.get('/mis_propiedades', admin)
router.get('/propiedades/crear', crear)
router.post('/propiedades/crear', 
    body('titulo').notEmpty().withMessage('El Titulo Del Anuncio Es Obligatorio'),
    saveEstate)


export default router