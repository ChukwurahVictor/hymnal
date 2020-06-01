const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: {
      type: String,
      required: true
   },
   hymns: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hymn'
   }]
})

module.exports = mongoose.model('Category', categorySchema);