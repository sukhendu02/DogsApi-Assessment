import express from "express";
import helmet from "helmet"
const app = express();

app.use(helmet());

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

export default app;