const router = require('express').Router();
const verify = require('../helpers/verifytoken')

const hymnControllers = require('../controllers/hymn');

router.route('/')
    .get(hymnControllers.getHymns)
    .post(verify, hymnControllers.createHymn);

router.route('/:hymnId')
    .get(hymnControllers.getHymn)
    .patch(verify, hymnControllers.updateHymn)
    .delete(verify, hymnControllers.deleteHymn);

module.exports = router;