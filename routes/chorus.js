const router = require('express').Router();
const mongoose = require('mongoose');

const chorusControllers = require('../controllers/chorus');

router.route('/')
   .post(chorusControllers.createChorus)

router.route('/:chorusId')
   .get(chorusControllers.getChorus)
   .patch(chorusControllers.updateChorus)
   .delete(chorusControllers.deleteChorus)



//export module
module.exports = router;