const multer = require('multer')


const uploadSingle = multer({
    limits: {fileSize: 10000000},
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload image file (jpg, jpeg, or png'))
        }
        cb(undefined, true)
    }
}).single('filmPicture')


exports.uploadSingle = uploadSingle

