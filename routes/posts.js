const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// Endpoint ==> 'api/v1/posts'

// Posts Route
router.get('/:post_id', ctrl.posts.show);
router.get('/', ctrl.posts.index);
router.put('/:post_id/edit', ctrl.posts.update);
router.put('/new',ctrl.posts.create);
router.delete('/:post_id', ctrl.posts.delete);

// comments Route
router.get('/:post_id/comments', ctrl.comments.index);
router.get('/:post_id/comments/:comment_id', ctrl.comments.show);
router.put('/:post_id/comments/new', ctrl.comments.create);
router.delete('/comments/:comment_id', ctrl.comments.delete);

module.exports = router;
