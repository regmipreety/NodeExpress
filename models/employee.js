const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, {timestamps : true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee