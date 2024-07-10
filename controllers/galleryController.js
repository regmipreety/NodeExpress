const Gallery = require('../models/gallery')
const path = require('path')

const gallery_index = (req, res) =>{
    Gallery.find({})
        .then(img =>{
        res.render('gallery/index', {images: img})
        })
        .catch(e=>{
            console.log(e)
        })
}
const gallery_upload = (req,res)=>{
    res.render('gallery/create')
}
const post_single =(req,res,next)=>{
    const file = req.file
    if(!file){
        req.flash('error_msg', 'Please select an Image.')
    }
    let url = file.path.replace('public', '')
    Gallery.findOne({imgUrl: url})
        .then(img=>{
            if(img){
                req.flash('error_msg', 'Please use a different Filename.')
                return res.redirect('/gallery/upload')
            }

            Gallery.create({imgUrl : url})
                .then(img=>{
                    req.flash('success_msg',' Image uploaded successfully.')
                    res.redirect('/gallery/index')
                })
        })
        .catch(err =>{
            console.log(err)
        })
   
}

module.exports = {
    gallery_upload, gallery_index, post_single
}