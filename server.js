require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');


connectDB()

app.use(express.json());

const TaskRoutes = require('./routes/tasks');

app.use('/api/tasks', TaskRoutes);


const port  = process.env.PORT || 3004; 
let server = app.listen(port, () => {
    console.log('listening on port ' + port)
});

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test")
        .then(() => {
            const db = mongoose.connection;
            db.on('error', (err) => console.error(err));
            db.once('open', () => console.log("Connection to database was successful"));
        })
        .catch((err) => console.error(err));
}

module.exports = server