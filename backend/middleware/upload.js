const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'application/pdf' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only pdf, jpeg, png, jpg  format allowed!'))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5   // 5 MB
    }
})

module.exports = upload