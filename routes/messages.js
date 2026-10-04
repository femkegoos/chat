import express from 'express'
import {list} from '../controllers/messages.js'

const router = express.Router()

/* GET messages listing. */
router.get('/', list)

export default router
