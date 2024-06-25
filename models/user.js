const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

//Fire a function after doc is saved
// userSchema.post('save', (doc, next) => {
// next()
// })

//fire a function before doc is saved
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User