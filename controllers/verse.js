const Verse = require('../model/Verse');
const Hymn = require('../model/Hymn');

const { verseValidation, verseUpdateValidation } = require('../helpers/validation');

module.exports = {
   createVerse: async(req, res, next) => {
      //Validate Entry
      const { error } = verseValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         const hymn = await Hymn.findById(req.body.hymn)
         const verse = new Verse(req.body)
         const createdVerse = await verse.save()
         hymn.verses.push(verse)
         await hymn.save()
         res.status(201).json({ 
            status: 'Success', 
            createdVerse 
         })
      } catch(error) {
         res.status(500).json(error)
      }
   },
   getVerse: async(req, res, next) => {
      try{
         const { verseId } = req.params;
         const verse = await Verse.findById(verseId);
         console.log(verse);
         res.status(200).json(verse)
      } catch(error) {
         res.status(500).json(error);
      }
   },
   updateVerse: async(req, res, next) => {
      const { error } = verseUpdateValidation.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      try {
         const { verseId } = req.params;
         const verse = req.body;
         const updatedVerse = await Verse.findByIdAndUpdate(verseId, verse)
         res.status(200).json({ 
            status: 'Success', 
            updatedVerse 
         })
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteVerse: async(req, res, next) => {
      try {
         const { verseId } = req.params;
         const deletedVerse = await Verse.findByIdAndDelete(verseId)
         res.status(200).json({
            status: 'Success',
            message: 'Deleted successfully'
         })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}