import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SubBreed = sequelize.define('SubBreed', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  breedId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'breeds',
      key: 'id',
    },
  },
}, {
  tableName: 'subbreeds',
  underscored:true,
  timestamps: true,

  indexes: [
    {
      fields: ["breed_id"],
    },
  ],
});

export default SubBreed;