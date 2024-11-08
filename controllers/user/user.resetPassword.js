import { User } from "../../models/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const resetPassword = asyncHandler(async (req, res) => {
    const { email, token, newPassword } = req.body;
    const user = await User.findOne({ "contactDetails.email": email });
    if (!user) throw new ApiError(400, "Invalid or expired token");
    console.log(user.contactDetails.email);
    if (user.resetPasswordToken !== token)
        throw new ApiError(400, "Invalid token");
    if(user.resetPasswordExpires < Date.now())
        throw new ApiError(400, "Token has expired");
    user.password = newPassword;
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpires = undefined; 
    await user.save();
    res.status(200).json(new ApiResponse(200, null, "password reset successfull"));

});

export {resetPassword}
