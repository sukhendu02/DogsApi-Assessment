import {Router } from "express";

import { getBreeds,createBreed,deleteBreed,updateBreed,getBreedById } from "../controller/breedController.js";
import { getSubBreedsByBreed,createSubBreed } from "../../subBreed/controller/subBreedController.js";
const router = Router();

router.get("/",getBreeds);

router.get("/:id",getBreedById);

router.post("/",createBreed);

router.delete("/:id",deleteBreed);

router.patch("/:id",updateBreed);

// SUB-BREED
router.get("/:breedId/subbreeds",getSubBreedsByBreed)

router.post("/:breedId/subbreeds",createSubBreed)


export default router;