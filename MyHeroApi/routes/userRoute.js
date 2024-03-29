const { Router } = require('express');
const router = Router();
const multer = require('multer')

const {
	validationSignup,
	isUserExistsSignup,
	validateLogin,
	authenticateToken,
	validationUpdateProfile,
	isUserExistsUpdate,
	validationChangePassword,
	validationForgotPassword,
	isEmailRegistered,
	validationResetPassword,
	isResetTokenValid,
} = require('../middlewares/userMiddleware');

const usersController = require('../controllers/usersController');

const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images')
    },

    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ storage: Storage })


router.post(
	'/user/signup',
	[validationSignup, isUserExistsSignup],
	usersController.signUp
);

router.post('/user/login', [validateLogin], usersController.login);

router.get('/user', [authenticateToken], usersController.getLoggedInUser);

router.post(
	'/user/update_profile',
	[authenticateToken, validationUpdateProfile, isUserExistsUpdate],
	usersController.updateProfile
);

router.post(
	'/user/change_password',
	[authenticateToken, validationChangePassword],
	usersController.changePassword
);

router.post('/user/forgot_password', usersController.forgotPassword);

router.get(
	'/user/forgot_password/verify/:token',
	usersController.forgotPasswordVerify
); 

router.post('/user/reset_password', usersController.resetPassword); 

router.post('/user/add_rate', usersController.addRate); 

router.post('/user/update_password', usersController.updatePassword);

router.post('/user/update_pseudo', usersController.updatePseudo);

router.post('/user/avatar', upload.array('photo', 3), usersController.uploadAvatar); 

router.get('/user/get', usersController.getUserData);

router.get('/user/get_rate', usersController.returnRateUser);

router.post('/user/add_xp', usersController.addXp);

router.get('/user/get_users', usersController.getUsers);

module.exports = router;
