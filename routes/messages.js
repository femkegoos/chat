import express from 'express'
import {list, show, create} from '../controllers/api/v1/messages.js'

const router = express.Router()

/* GET messages listing. */
router.get('/', list)
  
router.get('/:id', show)

router.post('/', create)
export default router
