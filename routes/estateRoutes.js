import express from 'express'
import {admin, crear, saveEstate} from '../controllers/estateController.js'

const router = express.Router()

router.get('/mis_propiedades', admin)
router.get('/propiedades/crear', crear)
router.post('/propiedades/crear', saveEstate)


export default router