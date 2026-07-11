
import {getSubBreedsByBreedService,createSubBreedService, getSubBreedByIdService,updateSubBreedByIdService,deleteSubBreedByIdService} from "../service/subBreedService.js"

export const getSubBreedsByBreed = async (req,res)=>{
    const subBreeds = await getSubBreedsByBreedService(req.params.breedId);
    return res.status(200).json({
        success:true,
        subBreeds
    })
}

export const createSubBreed = async(req,res)=>{
    const subBreed = await createSubBreedService(req.params.breedId,req.body);
    return res.status(201).json({
        success:true,
        subBreed
    })
}

export const getSubBreedById = async (req,res)=>{
    const subBreed = await getSubBreedByIdService(req.params.id)
    return res.status(200).json({
        success:true,
        subBreed
    })
}
export const updateSubBreed = async (req,res)=>{
    const subBreed = await updateSubBreedByIdService(req.params.id,req.body)
    return res.status(200).json({
        success:true,
        subBreed
    })
}
export const deleteSubBreed = async (req,res)=>{
    const subBreed = await deleteSubBreedByIdService(req.params.id)
    return res.status(204).send()
}