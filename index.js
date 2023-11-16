const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Defines that my app sends JSON formated files
app.use(express.json());

require('dotenv').config();

const port = process.env.server_port;

if (port == undefined) {
    console.warn("Could not retrieve port from env");
    return;
}

// makes server listen on port 3000
app.listen(port, () => {
    console.log("Server listening on port", port);
})

const mongoString = process.env.connection_string;

if (mongoString == undefined) {
    console.warn("Could not retrieve connection string from env");
    return;
}

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const routes = require('./routes/routes');
app.use('/api', routes);