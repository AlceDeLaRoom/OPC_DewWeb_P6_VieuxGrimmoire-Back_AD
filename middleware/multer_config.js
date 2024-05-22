const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype]
      //  const name = file.originalname.split(' ').join('_')
        const name = file.originalname.split('.')[0].split(' ').join('_');
       // const name = file.originalname.split(' ').join('_').replace(`.${extension}`,'')
        const extention = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extention)
    }
})

module.exports = multer({storage: storage}).single("image")