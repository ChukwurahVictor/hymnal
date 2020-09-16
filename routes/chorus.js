const router = require('express').Router();

const chorusControllers = require('../controllers/chorus');

router.route('/')
   .post(chorusControllers.createChorus);

router.route('/:chorusId')
   .get(chorusControllers.getChorus)
   .patch(chorusControllers.updateChorus)
   .delete(chorusControllers.deleteChorus);

module.exports = router;