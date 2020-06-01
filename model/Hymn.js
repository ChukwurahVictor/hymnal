const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const hymnSchema = new Schema({
    number: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    chorus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chorus'
    },
    verses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Verse'
    }]
})

const Hymn = mongoose.model('Hymn', hymnSchema)

//export schema
module.exports =  Hymn













