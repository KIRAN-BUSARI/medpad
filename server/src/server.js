import { config } from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

config({
    path: "./.env"
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(`Server running on port http://localhost:${process.env.PORT || 8001}`);
        });
    })
    .catch((error) => {
        console.log("Server failed to start due to error: ", error);
    });