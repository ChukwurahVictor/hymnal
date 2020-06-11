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
         const { hymnId } = req.params;
         const hymn = await Hymn.findById(hymnId).populate('chorus verses');
         res.status(200).json(hymn)
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
         const updatedVerse = await Verse.findOneAndUpdate(verseId, verse)
         res.status(200).json({ 
            status: 'Success', 
            message: 'Updated successfully' 
         })
      } catch(error) {
         res.status(500).json(error)
      }
   },
   deleteVerse: async(req, res, next) => {
      try {
         const { verseId } = req.params;
         const deletedVerse = await Verse.deleteOne(verseId)
         res.status(200).json({
            status: 'Success',
            message: 'Deleted successfully'
         })
      } catch(error) {
         res.status(500).json(error)
      }
   }
}