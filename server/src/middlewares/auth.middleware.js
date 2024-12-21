import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        console.log("Auth Debug - Headers:", req.headers.authorization);
        console.log("Auth Debug - Cookies:", req.cookies);
        
        let token;
        const authHeader = req.header("Authorization");
        
        // Extract token from different sources
        if (req.cookies?.accessToken) {
            console.log("Auth Debug - Using cookie token");
            token = req.cookies.accessToken;
        } else if (authHeader && authHeader.startsWith('Bearer ')) {
            console.log("Auth Debug - Using Bearer token");
            token = authHeader.split(' ')[1];
        }
        
        console.log("Auth Debug - Extracted token:", token ? "Token present" : "No token");
        
        if (!token) {
            throw new ApiError(401, "Authentication token is required. Please provide a valid token.");
        }
        
        // Basic token format validation
        if (token.split('.').length !== 3) {
            throw new ApiError(401, "Invalid token format. JWT must contain three parts.");
        }
        
        console.log("Auth Debug - Attempting token verification");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Auth Debug - Token verified successfully");

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            console.log("Auth Debug - JWT Error:", error.message);
            throw new ApiError(401, "Invalid token format or signature");
        } else if (error.name === 'TokenExpiredError') {
            console.log("Auth Debug - Token Expired");
            throw new ApiError(401, "Token has expired. Please login again");
        }
        console.log("Auth Debug - Auth Error:", error);
        throw new ApiError(401, "Authentication failed. Please try logging in again.");
    }
});

export const roleBasedAccess = (...roles) => {
    return asyncHandler(async (req, _, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "You are not authorized to access this route")
        }
        next()
    });
};
