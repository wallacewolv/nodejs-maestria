const router = require('express').Router();

const UserController = require('../controllers/UserController');

// middleware
const checkToken = require('../helpers/check-token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getById);
router.patch('/edit/:id', checkToken, UserController.editUser);

module.exports = router;
