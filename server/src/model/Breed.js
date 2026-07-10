import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Breed = sequelize.define('Breed', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    
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
  underscored:true,
  timestamps: true,

    indexes: [
    {
      unique: true,
      fields: ["name"],
    },
  ],
});

export default Breed;