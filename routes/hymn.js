const router = require('express').Router();

const hymnControllers = require('../controllers/hymn');

router.route('/')
    .get(hymnControllers.getHymns)
    .post(hymnControllers.createHymn);

router.route('/:hymnId')
    .get(hymnControllers.getHymn)
    .patch(hymnControllers.updateHymn)
    .delete(hymnControllers.deleteHymn);

module.exports = router;