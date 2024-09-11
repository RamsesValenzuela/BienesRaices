import express from 'express'
import {admin, crear} from '../controllers/estateController.js'

const router = express.Router()

router.get('/mis_propiedades', admin)
router.get('/propiedades/crear', crear)


export default router