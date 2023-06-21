"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.editPet = exports.editPetPage = exports.addPets = exports.addPetPage = exports.onePet = exports.allPets = exports.defaultPets = void 0;
const pets_1 = require("../models/pets");
const defaultPets = (req, res, next) => {
    res.redirect('/pets');
};
exports.defaultPets = defaultPets;
const allPets = async (req, res, next) => {
    let petsList = await pets_1.Pets.findAll();
    res.render('all-pets', {
        petsList
    });
};
exports.allPets = allPets;
const onePet = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem = await pets_1.Pets.findByPk(itemId);
    if (petItem) {
        res.render('pet-detail', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'Pet not found' });
    }
};
exports.onePet = onePet;
const addPetPage = (req, res, next) => {
    res.render('add-pet');
};
exports.addPetPage = addPetPage;
const addPets = async (req, res, next) => {
    console.log(req.body);
    let newPet = req.body;
    await pets_1.Pets.create(newPet);
    res.redirect('/pets');
};
exports.addPets = addPets;
const editPetPage = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem = await pets_1.Pets.findOne({
        where: { petId: itemId }
    });
    if (petItem) {
        res.render('edit-pet', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'pet not found' });
    }
};
exports.editPetPage = editPetPage;
const editPet = async (req, res, next) => {
    let itemId = req.params.petId;
    let updatedItem = req.body;
    let [updated] = await pets_1.Pets.update(updatedItem, {
        where: { petId: itemId }
    });
    if (updated === 1) {
        res.redirect('/pet');
    }
    else {
        res.render('error', { message: 'Pet could not be updated' });
    }
};
exports.editPet = editPet;
const deletePet = async (req, res, next) => {
    let itemId = req.params.petId;
    let deleted = await pets_1.Pets.destroy({
        where: { petId: itemId }
    });
    if (deleted) {
        res.redirect('/pets');
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
};
exports.deletePet = deletePet;
