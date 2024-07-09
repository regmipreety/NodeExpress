const Employee = require('../models/employee')

const employee_index = (req, res)=>{
   Employee.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('employees/index', {title: 'All Employees', employees: result})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const employee_get = (req, res) => {
    res.render('employees/create', {title:'Create Employee'})
}   

const employee_post = (req, res)=>{
    const { name, designation, salary } = req.body;
    const employee = new Employee(req.body)
    employee.save()
    .then((result)=>{
        res.redirect('/employees')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const employee_search = (req, res)=> {
    res.render('employees/search',{title: 'Search Employee', employee: ''})
}

const employee_search_result = (req, res)=> {
    let searchTerm = req.query.name
    // Constructing the query with case-insensitive regex
    const query = { name: { $regex: new RegExp(searchTerm, 'i') } };
    Employee.find(query)
        .then((employee) => {
                res.render('employees/search', {title: 'Employee', employee})            
        })
        .catch((err) => {
            console.log(err)
        })
}
const employee_edit = (req, res) => {
    let id= req.params.id
    console.log(id)
    Employee.findById(id)
        .then((employee)=>{
            res.render('employees/edit', {title:'Update Employee', employee})
        })
        .catch(err=>{
            console.log(err)
        })
}

const employee_update = (req, res) => {
    let searchQuery = {_id: req.params.id }
    console.log(searchQuery)
    Employee.updateOne(searchQuery, { $set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then(employee => {
        console.log(employee)
        res.redirect('/employees')
    })
    .catch(err => {
        console.log(err)
    })
}

const employee_delete = (req, res) =>{
    let delete_id = req.params.id
    console.log(delete_id)
    Employee.deleteOne({_id: delete_id})
        .then(employee=>{
            res.redirect('/employees')
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = {
    employee_index, employee_get, employee_post, employee_search, 
    employee_search_result, employee_edit, employee_update, employee_delete
}