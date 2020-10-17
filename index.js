const express = require('express');
const mongoose = require('mongoose');
const conversionRoutes = require('./routes/conversions');
const bodyParser = require('body-parser');

const index = express();

index.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header', 'Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods',
    "GET, PUT, POST, DELETE, OPTIONS, PATCH");
    next();
  });

mongoose.connect(process.env.MONGODB_URL, {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000
});

//const port = process.env.PORT || 3000;

//app.listen(port);

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({extended: false}));
  
//console.log(`app running on port ${port}`);

index.use('', conversionRoutes);

module.exports = index;
