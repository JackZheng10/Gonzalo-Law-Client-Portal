const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
let routes = require('./routes');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true}
);

const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connected");
})
connection.on('error', (e) => console.log("error"));

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`); 
});