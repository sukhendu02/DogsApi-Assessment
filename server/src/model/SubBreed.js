import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SubBreed = sequelize.define('SubBreed', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  breedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'breeds',
      key: 'id',
    },
  },
}, {
  tableName: 'subbreeds',
  timestamps: true,
});

export default SubBreed;