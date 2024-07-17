const express = require('express')
const router = express.Router()

const movieController = require('../controllers/movieController')

router.get('/results', movieController.getResults)

module.exports = router