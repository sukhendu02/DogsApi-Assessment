import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Breed = sequelize.define('Breed', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'breeds',
  timestamps: true,
});

export default Breed;