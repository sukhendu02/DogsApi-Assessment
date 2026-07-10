import app from "./app.js";
import { sequelize, syncDatabase } from "./src/model/index.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

// START THE SERVER
const startServer = async () => {
  try{
       await sequelize.authenticate();

    // LISTEN TO SERVER
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    await syncDatabase();
  }catch(error){
    console.error("Error starting server:", error);
  }
};

startServer();