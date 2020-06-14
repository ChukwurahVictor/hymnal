require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const hymnRoutes = require('./routes/hymn');
const chorusRoutes = require('./routes/chorus');
const verseRoutes = require('./routes/verse');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/users');

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));


//setup database
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB.'))
db.on('error', (error) => console.error(error))

//handle routes
app.use('/hymns', hymnRoutes);
app.use('/chorus', chorusRoutes);
app.use('/verse', verseRoutes);
app.use('/category', categoryRoutes);
app.use('/users', userRoutes);

app.use('/', (req, res) => {
    res.send('This is a hymn app')
})

//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found!')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

//set port listener
PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started on port 5000'))