const router = require('express').Router();
const mongoose = require('mongoose');

const hymnControllers = require('../controllers/hymn');

router.route('/')
    .get(hymnControllers.getHymns)
    .post(hymnControllers.createHymn)

router.route('/:hymnId')
    .get(hymnControllers.getHymn)
    .patch(hymnControllers.updateHymn)
    .delete(hymnControllers.deleteHymn)


//export module
module.exports = router;