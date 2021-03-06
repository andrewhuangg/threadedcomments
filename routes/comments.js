const express = require('express');
const router = express.Router();
const { getComments } = require('../controllers/comments');
const { authenticate } = require('../middleware/authenticate');

router.route('/').get(getComments);

module.exports = router;
