import express from 'express'
import {list, show} from '../controllers/api/v1/messages.js'

const router = express.Router()

/* GET messages listing. */
router.get('/', list)

router.get('/:id', show)

export default router
