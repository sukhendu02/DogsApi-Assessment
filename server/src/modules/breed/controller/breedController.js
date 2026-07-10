import { getBreedService,createBreedService,deleteBreedService,updateBreedService,getBreedByIdService } from "../service/breedService.js"; 

export const getBreeds = async(req,res)=>{
    const breeds = await getBreedService();
    return res.status(200).json({
        success:true,
        breeds
    })
}
export const getBreedById = async(req,res)=>{
    const breed = await getBreedByIdService(req.params.id);
    return res.status(200).json({
        success:true,
        breed
    })
}

export const createBreed = async(req,res)=>{
    const response = await createBreedService(req.body);
    res.status(201).json({
        success:true,
        message:"Breed added sucessfully",
        breed:response
    })
}
export const deleteBreed = async(req,res)=>{

    const response = await deleteBreedService(req.params.id);
    res.status(204).send()
}

export const updateBreed = async(req,res)=>{
    const response = await updateBreedService(req.body,req.params.id);
    res.status(200).json({
        success:true,
        message:"Breed updated sucessfully",
        breed:response
    })
}


