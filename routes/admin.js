var express = require('express');
var router = express.Router();

var authController = require('../controller/authcontroller');
var userController = require('../controller/userController');
const authorize = require("../middlewares/authjwt");
global.myAccount = null;

// function isLogin(req, res, next) {
//     if (myAccount !== null) {
//         next();
//     } else {
//         res.redirect('/admin/signin');
//     }
// }

// get the login page
// router.get('/signin', authController.sign);
// login
router.post('/login', authController.login);
// register
router.post('/register', authController.register);
// logout
// router.get('/signin/logout', authController.logout);

// get the users page
router.get('/', authorize,  userController.getUser);
// get the online users page
router.get('/onlineuser', authorize, userController.getOnlineUser);
// delete the user
router.post('/user/delete', authorize, userController.deleteUser);
// recover the user
router.post('/user/recover',authorize,  userController.recoverUser);
// block the user
router.post('/user/block', authorize, userController.blockUser);
// unblock the user
router.post('/user/unblock', authorize, userController.unblockUser);


module.exports = router;