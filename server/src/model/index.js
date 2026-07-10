import sequelize from "../config/database.js";
import Breed from "./Breed.js"
import SubBreed from "./SubBreed.js"



Breed.hasMany(SubBreed, {
  foreignKey: 'breedId',
  onDelete: 'CASCADE',
});
SubBreed.belongsTo(Breed, { foreignKey: 'breedId' });

const syncDatabase = async ()=>{
    await sequelize.sync({alter:true});
    console.log("Database synchronized successfully");
}

export { sequelize,syncDatabase };