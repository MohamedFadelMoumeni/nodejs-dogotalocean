const express = require('express');
const PostsControllers = require('../controllers/Posts');

const router = express.Router();

router.get('/:id', PostsControllers.getPostsControl);
router.post('/create', PostsControllers.addPostControl);
router.delete('/delete', PostsControllers.deletePostControl);

module.exports = router;