import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // get extension (.jpg, .png)
        const baseName = path.basename(file.originalname, ext); // original filename without extension
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
})

export const upload = multer({
    storage
})