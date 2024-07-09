const express = require('express')

const router = express.Router();

const employeeController = require('../controllers/employeeController')

const  {requireAuth } = require('../middleware/authMiddleware')

router.get('/', requireAuth, employeeController.employee_index)

router.get('/create', requireAuth, employeeController.employee_get)

router.post('/', requireAuth, employeeController.employee_post)

router.get('/search', requireAuth, employeeController.employee_search)

router.get('/findEmployee', requireAuth, employeeController.employee_search_result)

router.get('/edit/:id', requireAuth, employeeController.employee_edit)

router.put('/edit/:id', requireAuth, employeeController.employee_update)

router.delete('/delete/:id', requireAuth, employeeController.employee_delete)


module.exports = router