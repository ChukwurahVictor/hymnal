const router = require('express').Router();

const verify = require('../helpers/verifytoken');
const categoryControllers = require('../controllers/category');

router.route('/')
   .get(categoryControllers.getCategories)
   .post(verify, categoryControllers.createCategory);

router.route('/:categoryId')
   .get(categoryControllers.getCategory)
   .patch(verify, categoryControllers.updateCategory)
   .delete(verify, categoryControllers.deleteCategory);

module.exports = router;