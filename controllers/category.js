const Category = require('../model/Category');

const { categoryValidation, categoryUpdateValidation } = require('../helpers/validation');

module.exports = {
   getCategories: async(req, res, next) => {
      try {
         const category = await Category.find();
         res.status(200).json(category);
      } catch(error) {
         res.status(500).json(error);
      }
   },
   createCategory: async(req, res, next) => {
      //Validate Entry
      const { error } = categoryValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      const categoryExists = await Category.findOne({ name: req.body.name })
      if(categoryExists) {
         return res.status(400).send('Category already exists')
      }
      try {
         const category = new Category(req.body);
         const createdCategory = await category.save();
         res.status(201).json({ status: 'Success', createdCategory });
      } catch(error) {
         res.status(500).json(error)
      }
   },
   getCategory: async(req, res, next) => {
      try {
         const { categoryId } = req.params;
         const category = await Category.findById(categoryId).populate('hymns', 'number title');
         res.status(200).json(category)
      } catch(error) {
         res.status(500).json(error);
      }
   },
   updateCategory: async(req, res, next) => {
      const { error } = categoryUpdateValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         //Get the category
         const { categoryId } = req.params;
         //Update the category
         const category = req.body;
         //Save and send response
         const updatedCategory = await Category.findOneAndUpdate(categoryId, category)
         res.status(200).json({ 
            status: 'Success', 
            updatedCategory 
         })
      } catch(error) {
         res.status(500).json(error);
      }
   },
   deleteCategory: async(req, res, next) => {
      try {
         //Get the category
         const { categoryId } = req.params;
         const category = await Category.findOneAndDelete(categoryId)
         //Delete category and send response
         res.status(200).json({ 
            status: 'Success', 
            message: 'Deleted successfully'
         })
      } catch(error) {
         console.log(error)
         res.status(500).json(error)
      }
   }
}