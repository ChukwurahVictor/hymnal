const router = require('express').Router();

const verify = require('../helpers/verifytoken');
const verseControllers = require('../controllers/verse');

router.route('/')
   .post(verify, verseControllers.createVerse);

router.route('/:chorusId')
   .get(verseControllers.getVerse)
   .patch(verify, verseControllers.updateVerse)
   .delete(verify, verseControllers.deleteVerse);

module.exports = router;