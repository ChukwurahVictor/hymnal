const router = require('express').Router();
const mongoose = require('mongoose');

const verseControllers = require('../controllers/verse');

router.route('/')
   .post(verseControllers.createVerse)

router.route('/:chorusId')
   .get(verseControllers.getVerse)
   .patch(verseControllers.updateVerse)
   .delete(verseControllers.deleteVerse)

//export module
module.exports = router;