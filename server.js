'use strict';

const express = require('express');
const app = express();

const didntfindHandler = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');
const stamper = require('./middleware/stamper.js');

app.get('/', stamper, (req, res) => {
    res.status(200).send('Hello World')
})

app.get('/data', stamper, (req, res) => {
    let outputObject = {
        say: "what",
        love: "it",
        "time": req.timestamp
    }

    res.status(200).json(outputObject);
});

app.get('/bad', (req, res, next) => {
    next('something went horribly horribly wrong')
});

app.use('*', didntfindHandler);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log(`Server up on port ${port}`))
}

module.exports = {
    app: app,
    start: start
}