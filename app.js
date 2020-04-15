const express = require('express');
const bodyparser  = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

//Middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Import route
const postRoute = require('./routes/PostRoute');

//Middleware
app.use('/posts', postRoute);



//db configuration
const db = require('./setup/myurl').mydb_url;

//db connection
mongoose
    .connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Connected to database!!'))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`Server is running at ${port}`));

