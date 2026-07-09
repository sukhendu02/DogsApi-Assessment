import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

// START THE SERVER
const startServer = async () => {
  try{
    // LISTEN TO SERVER
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }catch(error){
    console.error("Error starting server:", error);
  }
};

startServer();