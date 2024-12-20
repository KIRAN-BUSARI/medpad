import multer from "multer";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const uploadDir = "./public/temp";

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}

// File filter for allowed types
const fileFilter = (req, file, cb) => {
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
} else {
    cb(new ApiError(400, `File type ${file.mimetype} is not supported`), false);
}
};

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, uploadDir);
},
filename: function (req, file, cb) {
    // Get file extension
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    
    // Check if file exists, if so, append timestamp
    const fullPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(fullPath)) {
    const timestamp = Date.now();
    cb(null, `${nameWithoutExt}-${timestamp}${ext}`);
    } else {
    cb(null, file.originalname);
    }
}
});

export const upload = multer({
storage,
fileFilter,
limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
}
});
