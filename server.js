/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Starting point for the project
 *
 * @description
 *
 * @file        : server.js
 * @overview    : Set up the server, connect to database
 * @module      : this is necessary to run the fundoo notes app API
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : _ _ _
 * @since       : 13-06-2021
 *********************************************************************/

require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const app = express();
const swaggerUI = require('swagger-ui-express');
const logger = require('./config/logger');
const swagger = require('./swagger/swagger.json');
const fetch = require('node-fetch');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

databaseConnection();

//parsing the requests from user
app.use(express.urlencoded({
    extended: true
}));

//parse the request from user
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

require('./app/routes/routes')(app);

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Fundoo Notes Backend App!</h1>");
});

function sendData(country, website) {
    return `${country} =>> ${website}`;
}

//middleware file
function checkingCache(req, res, next) {
    const {country} = req.params;
    client.get(country, (err, website) => {
        if(err) throw err;
        if(website != null) res.send(sendData(country, website));
        else next();
    });   
}

app.get('/:country', checkingCache, async (req, res) => {
    try {
        const {country} = req.params;
        const resp = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
        const data = await resp.json();
        const website = data[0].web_pages[0];
        client.setex(country, 3600, website);
        res.send(sendData(country, website));
    } catch (error) {
        console.log("Error: ",error);
    }
});

//declaring a port number for server to run
app.listen(process.env.PORT, ()=>{
    logger.log("info", "Server is up and running!");
})

module.exports = app;