import { sendMail } from "./emailSetup.js";

export const generateAndSendVerificationEmail = async (user, req) => {
    console.log(user);
    const email = user.contactDetails.email;
    const verificationToken = user.generateVerificationToken();
    await user.save();


    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/users/verify-email/${verificationToken}`;
    await sendMail(
        email,
        'Verify Your Email',
        `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    );
    
};
