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
module.exports = {
    employee_index, employee_get, employee_post, employee_search, employee_search_result
}