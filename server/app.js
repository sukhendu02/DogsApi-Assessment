import express from "express";
import helmet from "helmet"
import { errorHandler, notFoundHandler } from "./src/middleware/ErrorHandler.js";
const app = express();

import breedRoute from './src/modules/breed/route/breedRoute.js'

app.use(helmet());

app.use(express.json());


// BREED ROUTES
app.use("/api/v1/breed", breedRoute)

// ROOT ROUTE
app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the Dogs Api"
    })
})

// HEALTH ROUTE
app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server is healthy"
    })
})
// NOT FOUND HANDLER
app.use(notFoundHandler)

// ERROR HANDLER
app.use(errorHandler)

export default app;