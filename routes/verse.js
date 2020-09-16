const router = require('express').Router();

const verseControllers = require('../controllers/verse');

router.route('/')
   .post(verseControllers.createVerse);

router.route('/:verseId')
   .get(verseControllers.getVerse)
   .patch(verseControllers.updateVerse)
   .delete(verseControllers.deleteVerse);

module.exports = router;