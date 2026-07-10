import { BadRequestError, ConflictError, NotFoundError } from "../../../middleware/ErrorHandler.js"
import Breed from "../../../model/Breed.js"
import SubBreed from "../../../model/subbreed.js"


// GET ALL BREEDS
export const getBreedService = async ()=>{
    const data = await Breed.findAll({
        include:SubBreed,
        order:[['created_at','DESC']]
    })

    if(!data){
        throw NotFoundError("Breed ")
    }
    return data;
}
// GET BREED BY ID 
export const getBreedByIdService = async (breedId)=>{
    if(!breedId){
        throw NotFoundError("Breed id not found");
    }
    const breed = await Breed.findByPk(breedId,{
        include:SubBreed,
    })
    if(!breed){
        throw NotFoundError("Breed")
    }
    return breed;
}


// CREATE NEW BREED
export const createBreedService = async (data)=>{
    const {name} = data;
    if(!name || !name.trim()){
        throw BadRequestError("Name of breed is required")
    }
    const breedExist = await Breed.findOne({
        where:{name:name.trim()},
    })
    if(breedExist){
        throw ConflictError("Breed");
    }
    const breed = await Breed.create({
        name:name.trim()
    })
    return breed;
}

// DELETE BREED
export const deleteBreedService = async(breedId)=>{
    if(!breedId){
        throw BadRequestError("Breed id is required")
    }
    const breed = await Breed.findOne({
        where:{id:breedId}
    })
    if(!breed){
        throw NotFoundError("Breed")
    }
    await Breed.destroy({
        where:{id:breed.id}
    })
    return;
}

// UPDATE NEW BREED
export const updateBreedService = async (data,breedId)=>{

    if(!breedId){
        throw BadRequestError("Breed id is missing")
    }

    const {name} = data;
    if(!name || !name.trim()){
        throw BadRequestError("Name of breed is required")
    }

    // CHECK IF NAME BREED ALRADY PRESENT
    const validateName = await Breed.findOne({
        where:{name:name.trim()}
    })
   

    // IF PRESENT
    if(validateName){
        throw ConflictError("Breed name")
    }
    

    // NOT PRESENT - FIND THE BREED AND SAVE THE DETAILS
    const breed = await Breed.findByPk(breedId);
    if(!breed){
        throw NotFoundError("Breed")
    }

    breed.name = name.trim();
    await breed.save();

    return breed;
}