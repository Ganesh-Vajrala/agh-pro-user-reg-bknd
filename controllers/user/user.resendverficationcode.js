import { User } from "../../models/user.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateAndSendVerificationEmail } from "../../utils/generateAndSendVerificationEmail.js";

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ "contactDetails.email": email });
    console.log(user);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    await generateAndSendVerificationEmail(user, req);

    res.status(200).json(new ApiResponse(200, null, "Verification email resent successfully"));
});

export {resendVerificationEmail};