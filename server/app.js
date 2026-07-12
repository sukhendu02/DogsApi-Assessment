import express from "express";
import helmet from "helmet"
import cors from 'cors'

import { errorHandler, notFoundHandler } from "./src/middleware/ErrorHandler.js";


const app = express();

import breedRoute from './src/modules/breed/route/breedRoute.js'
import subBreedRoute from "./src/modules/subBreed/route/subBreedRoute.js"


app.use(helmet());

app.use(express.json());



// Enable CORS
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL], 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

// BREED ROUTES
app.use("/api/v1/breed", breedRoute)

// SUB-BREED ROUTES
app.use("/api/v1/subbreed", subBreedRoute)

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