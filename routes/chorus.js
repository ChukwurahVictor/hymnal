const router = require('express').Router();

const verify = require('../helpers/verifytoken');
const chorusControllers = require('../controllers/chorus');

router.route('/')
   .post(verify, chorusControllers.createChorus);

router.route('/:chorusId')
   .get(chorusControllers.getChorus)
   .patch(verify, chorusControllers.updateChorus)
   .delete(verify, chorusControllers.deleteChorus);

module.exports = router;