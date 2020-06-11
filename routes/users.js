const router = require('express').Router();

const userControllers = require('../controllers/users');

router.post('/', userControllers.userSignup);
router.post('/login', userControllers.userLogin);

module.exports = router;