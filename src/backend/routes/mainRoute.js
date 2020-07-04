const express = require('express');
const mainController = require('../controllers/mainContoller')
const postController = require('../controllers/postController')
const middle = require('../controllers/middle');

const router = express.Router();

router.route('/').get(middle.redirectLogin,mainController.profile)
router.route('/signin').get(middle.redirectHome, mainController.signin)
router.route('/signup').get(middle.redirectHome, mainController.signup)
router.route('/signup').post(postController.signup);
router.route('/signin').post(postController.signin);
router.route('/signout').post(postController.signout);
router.route('/add').post( postController.addList);
router.route('/delete').post(postController.deleteOne);
router.route('/done').post(postController.doneOne);
router.route('/edit').post(postController.edit);

module.exports = router;
