import { Router } from 'express';
import { allPets, onePet, addPetPage, addPets, editPetPage, editPet, deletePet } from '../controllers/petController';


const router = Router();

router.get('/', allPets); // <-- update this line

// GET /coffee/:name - render the coffee item requested
router.get('/add', addPetPage);
router.post('/add', addPets);
router.get('/edit/:petId', editPetPage);
router.post('/edit/:petId', editPet)
router.post('/delete/:petId', deletePet);
router.get('/:petId', onePet);

export default router;