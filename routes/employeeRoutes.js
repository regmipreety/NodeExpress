const express = require('express')

const router = express.Router();

const employeeController = require('../controllers/employeeController')

const  {requireAuth } = require('../middleware/authMiddleware')

router.get('/', requireAuth, employeeController.employee_index)

router.get('/create', requireAuth, employeeController.employee_get)

router.post('/', requireAuth, employeeController.employee_post)


module.exports = router