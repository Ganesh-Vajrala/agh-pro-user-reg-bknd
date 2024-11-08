import { sendMail } from "./emailSetup.js"

export const generateAndSendForgotEmail = async (user, req) => {
    const email = user.contactDetails.email;
    const verificationToken = user.generatePasswordResetToken();
    await user.save();

    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password`;
    await sendMail(
        email,
        'Password Reset',
        `<p>Your reset code: ${verificationToken} <br> Click <a href="${verificationUrl}">here</a> to reset your password.</p>`
    );
    
}