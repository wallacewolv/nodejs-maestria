const router = require('express').Router();

const PetController = require('../controllers/PetController');

// middleware
const checkToken = require('../helpers/check-token');
const { imageUpload } = require('../helpers/image-upload');

router.post(
  '/create',
  checkToken,
  imageUpload.array('images'),
  PetController.create,
);
router.get('/', PetController.getAll);
router.get('/mypets', checkToken, PetController.getAllUserPets);
router.get('/myadoptions', checkToken, PetController.getAllUserAdoptions);
router.get('/:id', PetController.getPetById);
router.delete('/:id', checkToken, PetController.removePetById);
router.patch(
  '/:id',
  checkToken,
  imageUpload.array('images'),
  PetController.updatPet,
);

module.exports = router;
