const Chorus = require('../model/Chorus');
const Hymn = require('../model/Hymn');

const { chorusValidation, chorusUpdateValidation } = require('../helpers/validation');

module.exports = {
   createChorus: async(req, res, next) => {
      //Validate Entry
      const { error } = chorusValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         //Get the hymn
         const hymn = await Hymn.findById(req.body.hymn);
         //Create the chorus
         const chorus = new Chorus(req.body);
         //Add to hymn and save
         hymn.chorus = chorus;
         await hymn.save();
         //Save created chorus
         const createdChorus = await chorus.save();
         res.status(201).json({
            status: 'Success',
            createdChorus
         })
      } catch(error) {
            console.log(error);
            res.status(500).json(error)
      }
   },
   getChorus: async(req, res, next) => {
      try{
         const { chorusId } = req.params;
         const chorus = await Chorus.findById(chorusId);
         res.status(200).json(chorus)
      } catch(error) {
         res.status(500).json(error);
      }
   },
   updateChorus: async(req, res, next) => {
      const { error } = chorusUpdateValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         const { chorusId } = req.params;
         const chorus = req.body;
         const updatedChorus = await Chorus.findByIdAndUpdate(chorusId, chorus)
         res.status(200).json({ 
            status: 'Success', 
            message: 'Updated successfully' 
         })
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteChorus: async(req, res, next) => {
      try {
         const { chorusId } = req.params;
         const deletedChorus = await Chorus.findByIdAndDelete(chorusId)
         res.status(200).json({
            status: 'Success',
            message: 'Deleted successfully'
         })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}