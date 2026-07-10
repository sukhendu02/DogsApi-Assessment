import {Router } from "express";

import { getBreeds,createBreed,deleteBreed,updateBreed,getBreedById } from "../controller/breedController.js";
const router = Router();

router.get("/",getBreeds);

router.get("/:id",getBreedById);

router.post("/",createBreed);

router.delete("/:id",deleteBreed);

router.patch("/:id",updateBreed);

export default router;