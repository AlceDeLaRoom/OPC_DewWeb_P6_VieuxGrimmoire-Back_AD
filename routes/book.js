const express = require("express")
const auth = require('../middleware/auth')
const router = express.Router()

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBooks)
router.get('/:id', bookCtrl.getOneBook)
router.get('/bestrating', bookCtrl.getBestRating)
router.post('/', auth, bookCtrl.addBook)
router.put('/:id', auth, bookCtrl.modifyBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.post('/:id/rating', auth, bookCtrl.addGrade)

module.exports = router