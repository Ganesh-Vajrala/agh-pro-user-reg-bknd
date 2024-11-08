import { User } from "../../models/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAndSendForgotEmail } from "../../utils/generateAndSendForgotEmail.js";

const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ "contactDetails.email": email });

    if (!user) throw new ApiError(404, "User not found");

    await generateAndSendForgotEmail(user, req);

    res.status(200).json(new ApiResponse(200, null, "Password reset email sent"));
});

export default requestPasswordReset