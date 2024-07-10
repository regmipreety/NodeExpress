const mongoose = require('mongoose')

let imageSchema = new mongoose.Schema({
    imgUrl : String
})

let Picture = mongoose.model('Picture', imageSchema)

module.exports = Picture