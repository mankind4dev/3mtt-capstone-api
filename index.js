import express from "express";
import mongoose from "mongoose";
import dotenv from"dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import tasksRouter  from "./routes/tasks.route.js";

dotenv.config()


mongoose.connect(process.env.MONGODB).then(() =>{
    console.log("Connected to MongoDB perfectly!")
}).catch((err) =>{
    console.log(err)
})
const app = express();

app.use(cors())

app.use(express.json())
app.use(cookieParser()) 


app.use("/api/auth", authRouter)
app.use("/api/task", tasksRouter)
app.use("/api/tasks", tasksRouter)

const PORT = process.env.URL || 8000;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
});

app.use((err, res, req) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Interner Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})