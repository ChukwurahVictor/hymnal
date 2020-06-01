const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const verseSchema = new Schema({
   verse: {
      type: String,
      required: true
   }
})

//export schema
const Verse = mongoose.model('Verse', verseSchema);
module.exports = Verse;