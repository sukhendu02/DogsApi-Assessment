import { BadRequestError, NotFoundError } from "../../../middleware/ErrorHandler.js"
import Breed from "../../../model/Breed.js";
import SubBreed from "../../../model/subbreed.js";

// GET SUB-BREEDS USING BREEDS
export const getSubBreedsByBreedService = async(breedId)=>{
    if(!breedId){
        return BadRequestError("Breed id is required");
    }

    const breed = await Breed.findByPk(breedId)
    if(!breed){
        return NotFoundError("Breed")
    }
    const subBreeds = await SubBreed.findAll({
        where:{breedId},
        order:[['created_at','DESC']]
    })

    return subBreeds;
}
// CREATE SUB-BREED USING BREED
export const createSubBreedService = async(breedId,data)=>{
    if(!breedId){
        throw BadRequestError("Breed id is missing")
    }

    const {name} = data
    if(!name || !name.trim()){
        throw BadRequestError("Name of sub breed is required")
    }

    const breed = await Breed.findByPk(breedId)
    if(!breed){
        throw NotFoundError("Breed")
    }

    const subBreed = await SubBreed.create({
        name:name.trim(),
        breedId:breed.id
    })

    

    return subBreed;
}

// GET SUBBREED BY ID 
export const getSubBreedByIdService =async(subBreedId)=>{
    if(!subBreedId){
        throw BadRequestError("Sub Breed id is missing")
    }

    const subBreed = await SubBreed.findByPk(subBreedId)
    if(!subBreed){
        throw NotFoundError("Sub-Breed")
    }
    return subBreed
}
// UPDATE SUBBREED BY ID 
export const updateSubBreedByIdService =async(subBreedId,data)=>{
    if(!subBreedId){
        throw BadRequestError("Sub Breed id is missing")
    }
    const {name }=data;
    if(!name || !name.trim()){
        throw BadRequestError("Name of Subbreed is required")
    }

    const subBreed = await SubBreed.findByPk(subBreedId)
    if(!subBreed){
        throw NotFoundError("Sub-Breed")
    }
    subBreed.name= name.trim();
    await subBreed.save();
    return subBreed;
}

// DELETE SUBBREED BY ID 
export const deleteSubBreedByIdService =async(subBreedId)=>{
    if(!subBreedId){
        throw BadRequestError("Sub Breed id is missing")
    }

    const subBreed = await SubBreed.findByPk(subBreedId)
    if(!subBreed){
        throw NotFoundError("Sub-Breed")
    }
    await subBreed.destroy();
    return;
}