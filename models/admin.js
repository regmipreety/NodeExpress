const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
let adminSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: {
        type: String,
        select: false
    }
})

adminSchema.plugin(passportLocalMongoose, {usernameField:'email'})
module.exports = mongoose.model('Admin', adminSchema)