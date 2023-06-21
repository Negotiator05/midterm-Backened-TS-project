import { RequestHandler } from "express";
import { Pets } from "../models/pets";

export const defaultPets: RequestHandler = (req, res, next) => {
    res.redirect('/pets');
}

export const allPets: RequestHandler = async (req, res, next) => {
    let petsList: Pets[] = await Pets.findAll();
    res.render('all-pets', {
        petsList
    });
}

export const onePet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem: Pets | null = await Pets.findByPk(itemId);

    if (petItem) {
        res.render('pet-detail', { foundPet: petItem })
    }
    else{
        res.status(404).render('error', { message: 'Pet not found' });

    }
}


export const addPetPage: RequestHandler = (req, res, next) => {
    res.render('add-pet');
}
export const addPets: RequestHandler =async (req, res, next) => {
    console.log(req.body);

    let newPet: Pets = req.body;
    await Pets.create(newPet) ;
    res.redirect('/pets');
}
export const editPetPage: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let petItem: Pets | null = await Pets.findOne({
        where: { petId: itemId }
    });

    if (petItem) {
        res.render('edit-pet', { foundPet: petItem });
    }
    else {
        res.status(404).render('error', { message: 'pet not found' });
    }
}

export const editPet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;
    let updatedItem: Pets = req.body;

    let [updated] = await Pets.update(updatedItem, {
        where: { petId: itemId }
    });

    if (updated === 1) {
        res.redirect('/pet');
    }
    else {
        res.render('error', { message: 'Pet could not be updated' });
    }
}

export const deletePet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.petId;

    let deleted = await Pets.destroy({
        where: { petId: itemId }
    });

    if (deleted) {
        res.redirect('/pets')
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
}

