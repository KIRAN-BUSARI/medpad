import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        throw new ApiError(400, "Email, password, and full name are required");
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: fullName,
        });

        res.status(201).json(new ApiResponse(201, userRecord, "User registered successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    try {
        const apiKey = process.env.FIREBASE_API_KEY;

        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        const { idToken, refreshToken, localId } = response.data;

        res.status(200).json(
            new ApiResponse(200, { idToken, refreshToken, userId: localId }, "User logged in successfully")
        );
    } catch (error) {
        throw new ApiError(400, error.response?.data?.error?.message || error.message);
    }
});