const Hymn = require('../model/Hymn');
const Category = require('../model/Category');

const { hymnValidation, hymnUpdateValidation } = require('../helpers/validation');

module.exports = {
   getHymns: async(req, res, next) => {
      try{
         const hymn = await Hymn
                              .find()
                              .select('number title')
                              .populate('category', 'name');
         res.status(200).json(hymn);
      } catch(error) {
         res.status(500).json(error)
      }
   },
   createHymn: async(req, res, next) => {
      //Validate Entry
      const { error } = hymnValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      const numberExists = await Hymn.findOne({ number: req.body.number })
      if(numberExists) {
         return res.status(400).send('Hymn number already exists')
      }
      try {
         //Get the Category
         const category = await Category.findById(req.body.category);
         //Create the Hymn
         const hymn = new Hymn(req.body);
         //Push into Category array 'hymns'
         category.hymns.push(hymn)
         await category.save();
         //Save the created hymn
         const createdHymn = await hymn.save();
         res.status(201).json({ 
            status: 'Success', 
            createdHymn 
         });
      } catch(error) {
         console.log(error)
         res.status(400).json(error)
      }
   },
   getHymn: async(req, res, next) => {
      try{
         const { hymnId } = req.params;
         const hymn = await Hymn
                           .findById(hymnId)
                           .populate('chorus', 'chorus')
                           .populate('category', 'name')
                           .populate('verses', 'verse')
         res.status(200).json(hymn)
      } catch(error) {
         res.status(500).json(error);
      }
   },
   updateHymn: async(req, res, next) => {
      const { error } = hymnUpdateValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         //Get the hymn
         const { hymnId } = req.params;
         //Update the hymn
         const hymn = req.body;
         //Save and send response
         const updatedHymn = await Hymn.findByIdAndUpdate(hymnId, hymn)
         res.status(200).json({ status: 'Success', updatedHymn })
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteHymn: async(req, res, next) => {
      try {
         //Get the hymn
         const { hymnId } = req.params;
         const hymn = await Hymn.findByIdAndDelete(hymnId)
         //Delete hymn and send response
         res.status(200).json({ status: 'Success', message: 'Deleted successfully'})
      } catch(error) {
         console.log(error)
         res.status(500).json(error)
      }
   }
}