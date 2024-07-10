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

const post_multiple = async (req, res, next) => {
    try {
        const files = req.files;
        if (!files) {
            req.flash('error_msg', 'Please select an Image.');
            return res.redirect('/gallery');
        }

        for (const file of files) {
            let url = file.path.replace('public', '');
            const img = await Gallery.findOne({ imgUrl: url });

            if (img) {
                console.log('Duplicate image');
                req.flash('error_msg', 'Duplicate images cannot be uploaded.');
                return res.redirect('/gallery');
            }

            await Gallery.create({ imgUrl: url });
        }

        req.flash('success_msg', 'Images uploaded successfully.');
        return res.redirect('/gallery');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred while uploading images.');
        return res.redirect('/gallery');
    }
};


const image_delete = (req, res)=>{
    let id = req.params.id
    Gallery.findByIdAndDelete(id)
        .then(result =>{
            req.flash('success_msg', 'Image deleted successfully')
        })
}

module.exports = {
    gallery_upload, gallery_index, post_single, post_multiple
}