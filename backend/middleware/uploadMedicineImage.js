const path = require('path')
const multer = require('multer')

const fs = require('fs');
const dir = path.join(path.dirname(__dirname), 'uploads/medicine');

fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only jpeg, png, jpg  format allowed!'))
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5   // 5 MB
    }
})

module.exports = upload