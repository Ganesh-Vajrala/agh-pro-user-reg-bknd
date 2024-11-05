
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {

    const {fullName, email, phoneNo, stream, level,password} = req.body;
    console.log(fullName,email,phoneNo,stream,level,password);

    //validation
    if([fullName, email, phoneNo, stream, level, password].some((field) => field?.trim() === ""))
        throw new ApiError(400, "All Fields are required");

    const existedUser = await User.findOne({
        $or: [
        { "contactDetails.email": email },
        { "contactDetails.phoneNo": phoneNo }
    ]
    })
    if(existedUser)
        throw new ApiError(409, "User with mail or phoneNo already exists");

    const user = await User.create({
        basicDetails: {
            fullName,
        },
        contactDetails: {
            email,
            phoneNo,
        },
        preferences: {
            items: [
                {
                    stream, 
                    details: {
                        level, 
                    },
                },
            ],
        },
        password
    })

    const createdUser = await User.findById(user._id);

    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }
    console.log(createdUser);
    return res.status(201).json(new ApiResponse(200, createdUser, "User registerd successfully"));

})

export { registerUser }