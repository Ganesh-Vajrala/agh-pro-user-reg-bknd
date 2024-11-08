import { User } from "../../models/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    console.log(token)
    const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() }
    });
    console.log(user)

    if (!user) throw new ApiError(400, "Invalid or expired token");

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, null, "Email verified successfully"));
});

export {verifyEmail};