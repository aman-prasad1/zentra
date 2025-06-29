import multer from 'multer';

const storage = multer.diskStorage({
    dest: function (req, file, cb) {
        cb(null, "./public")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage
})