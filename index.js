import express from 'express';
const app = express();
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
import registerRouter from './routes/registerUser.route.js';
import errorHandler from './middlewares/errorHandler.js';
import authoRouter from './routes/authorization.route.js';
import cookieParser from "cookie-parser";
// import empRouter from "./routes/employer.route.js";


app.use(cookieParser())

//database connection
const url=process.env.MONGO_URI;
mongoose.connect(url)
.then(()=>{
    app.use("/api/full-project",registerRouter);
    app.use("/api/autho",authoRouter);
    // app.use("/api/employer",empRouter)
})
.catch((error)=>{
    console.log("database connection error",error.message)
})

//start server
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is starting on port ${PORT}`);
})

app.use(errorHandler);

