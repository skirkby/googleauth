const express = require('express');
const server = express();
const authRouter = require('../auth/authRouter.js');


// response body parsing middleware
server.use(express.json());

// authentication endpoints router
server.use('/auth', authRouter);

// handler for the root of the api
server.get('/', async (req, res) => {
    try {
        res.json({ message: "api up" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});



module.exports = server;