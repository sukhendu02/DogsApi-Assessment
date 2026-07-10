import {Sequelize} from "sequelize";

import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:"postgres",
    logging:process.env.NODE_ENV==="development"? console.log : false,

    define:{
        underscored:true,
        timestamps:true,
    },
     dialectOptions: process.env.NODE_ENV === "production"
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
})

export default sequelize;