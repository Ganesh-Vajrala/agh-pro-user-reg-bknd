import {Router} from 'express';

import { registerUser } from '../controllers/user/user.controllers.js';
import { verifyEmail } from '../controllers/user/user.emailverfication.js';
import { resendVerificationEmail } from '../controllers/user/user.resendverficationcode.js';
import { resetPassword } from '../controllers/user/user.resetPassword.js';
import requestPasswordReset from '../controllers/user/user.forgotpassword.js';

const router = Router()

router.route("/register").post(registerUser)
router.route("/verify-email/:token").get(verifyEmail);
router.route("/resend-verification-email").post(resendVerificationEmail);
router.route("/forgot-password").post(requestPasswordReset)
router.route("/reset-password").post(resetPassword)
export default router;