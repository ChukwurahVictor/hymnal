const router = require('express').Router();

const categoryControllers = require('../controllers/category');

router.route('/')
   .get(categoryControllers.getCategories)
   .post(categoryControllers.createCategory)

router.route('/:categoryId')
   .get(categoryControllers.getCategory)
   .patch(categoryControllers.updateCategory)
   .delete(categoryControllers.deleteCategory)

module.exports = router;