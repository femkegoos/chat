import express from 'express'
import {list, show, create, update} from '../controllers/api/v1/messages.js'

const router = express.Router()

/* GET messages listing. */
router.get('/', list)
  
router.get('/:id', show)

router.post('/', create)

router.put('/:id', update)

export default router
