import { Router } from "express";
import express from "express";
import {getSubBreedById,updateSubBreed,deleteSubBreed} from "../controller/subBreedController.js"
const router = Router();

router.get('/:id', getSubBreedById);

router.patch('/:id', updateSubBreed);

router.delete('/:id', deleteSubBreed);


export default router;