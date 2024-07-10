const express = require('express')

const router = express.Router()

const path = require('path')

const multer = require('multer')

//Set Image Storage
let storage = multer.diskStorage({
    destination : './public/uploads/images/',
    filename : (req,file, cb)=>{
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        checkFileType(file, cb)
    }
})

const checkFileType = (file, cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    if(extname){
        return cb(null, true)
    } else {
        cb('Error: Please upload images only')
    }
}

const galleryController = require('../controllers/galleryController')

router.get('/', galleryController.gallery_index)

router.get('/upload', galleryController.gallery_upload)

router.post('/uploadSingle', upload.single('singleImage'), galleryController.post_single)

router.post('/uploadmultiple', upload.array('multipleImages'), galleryController.post_multiple)

module.exports = router