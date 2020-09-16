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
         const hymn = await Hymn.findById(req.body.hymn);
         const chorus = new Chorus(req.body);
         hymn.chorus = chorus;
         await hymn.save();
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
         if(chorus) {
            return res.status(200).json({ chorus });
         }
         return res.status(400).send('Chorus with the specified id does not exists');
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
         if(updatedChorus) {
            return res.status(200).json({ 
               status: 'Success', 
               message: 'Updated successfully' 
            });
         }
         return res.status(400).send('Chorus not found!');
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteChorus: async(req, res, next) => {
      try {
         const { chorusId } = req.params;
         const deletedChorus = await Chorus.findByIdAndDelete(chorusId)
         if(deletedChorus) {
            return res.status(200).json({
               status: 'Success',
               message: 'Deleted successfully'
            });
         }
         return res.status(400).send('Chorus not found!');
      } catch(error) {
         res.status(500).json(error)
      }
   }
}