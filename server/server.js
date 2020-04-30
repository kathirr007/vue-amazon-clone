const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// GET - Retrieve the data from the server
app.get('/', (req, res) => {
    res.json('Hello dear...')
})

// POST - Send data from frontend to the server
app.post('/', (req, res) => {
    console.log('Logging from POST request...')
    console.log(req.body.name)
})


app.listen(4000, err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Listening on PORT', 4000)
    }
})