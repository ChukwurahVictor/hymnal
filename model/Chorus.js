const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const chorusSchema = new Schema({
   chorus: {
      type: String
   }
})

const Chorus = mongoose.model('Chorus', chorusSchema);
module.exports = Chorus