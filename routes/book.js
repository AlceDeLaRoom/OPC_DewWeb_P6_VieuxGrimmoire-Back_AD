const express = require("express")
const auth = require('../middleware/auth')
//const multer = require('../middleware/multer_config')
const router = express.Router()

const bookCtrl = require('../controllers/book')
/*
router.get('/:id', auth, thingCtrl.getOneThing)
router.get('/', auth, thingCtrl.getAllThings)
router.get('/:id', auth, thingCtrl.getOneThing)
router.post('/', auth, thingCtrl.addThing)
router.put('/:id', auth, thingCtrl.modifyThing)
router.delete('/:id', auth, thingCtrl.deleteThing)
router.post('/', auth, thingCtrl.addThing)*/

module.exports = router