const express = require('express')

const router = express.Router();

const blogController = require('../controllers/blogController')

const  {requireAuth } = require('../middleware/authMiddleware')

router.get('/create', requireAuth, blogController.blog_create_get)

 //Get all blogs
 router.get('/', requireAuth, blogController.blog_index)

 router.post('/', requireAuth, blogController.blog_create_post)

 router.get('/:id', requireAuth, blogController.blog_details)

 router.delete('/:id', requireAuth, blogController.blog_delete)

module.exports = router