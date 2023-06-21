"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const petController_1 = require("../controllers/petController");
const router = (0, express_1.Router)();
router.get('/', petController_1.allPets); // <-- update this line
// GET /coffee/:name - render the coffee item requested
router.get('/add', petController_1.addPetPage);
router.post('/add', petController_1.addPets);
router.get('/edit/:petId', petController_1.editPetPage);
router.post('/edit/:petId', petController_1.editPet);
router.post('/delete/:petId', petController_1.deletePet);
router.get('/:petId', petController_1.onePet);
exports.default = router;
