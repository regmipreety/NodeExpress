const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required:[ true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength:[ 6,'Minimun password length is 6 characters']
    }
}, {timestamps : true})

const User = mongoose.model('User', userSchema)
module.exports = User