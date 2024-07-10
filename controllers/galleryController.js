const Gallery = require('../models/gallery')
const path = require('path')
const fs = require('fs')

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
                    res.redirect('/gallery')
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


const image_delete = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        // Find the image by ID
        const result = await Gallery.findById(id);
        if (!result) {
            req.flash('error_msg', 'Image not found.');
            return res.redirect('/gallery');
        }

        // Construct the file path
        const filePath = path.join(__dirname, '../public', result.imgUrl);
        console.log(filePath)
        // Delete the image file
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error(err);
                req.flash('error_msg', 'An error occurred while deleting the image.');
                return res.redirect('/gallery');
            }

            // Delete the image record from the database
            try {
                await Gallery.deleteOne({ _id: id });
                req.flash('success_msg', 'Image deleted successfully');
                return res.redirect('/gallery');
            } catch (deleteErr) {
                console.error(deleteErr);
                req.flash('error_msg', 'An error occurred while deleting the image from the database.');
                return res.redirect('/gallery');
            }
        });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred.');
        return res.redirect('/gallery');
    }
};

module.exports = {
    gallery_upload, gallery_index, post_single, post_multiple, image_delete
}