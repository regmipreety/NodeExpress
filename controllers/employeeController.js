const employee_index = (req, res)=>{
    res.render('employees/index', {title: 'Employees'})
}

const employee_get = (req, res) => {
    res.render('employees/create', {title:'Create Employee'})
}                      
module.exports = {
    employee_index, employee_get
}