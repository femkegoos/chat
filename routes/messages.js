import express from 'express'
import {list} from '../controllers/api/v1/messages.js'

const router = express.Router()

/* GET messages listing. */
router.get('/', list)

export default router
