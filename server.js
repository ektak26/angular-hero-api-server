const express = require('express');
const bodyParser = require('body-parser');
var path   = require('path');
//var upload    = require('./app/controllers/upload');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

var cors        = require('cors');
var corsOptions = {
    origin:'*'
};
app.use(cors(corsOptions));

console.log("PATH",path.join(__dirname, '/public'));

app.use(express.static(path.join(__dirname, '/public')));


/* const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
 */
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to angular heroes APIs."});
});


require('./app/routes/hero.routes.js')(app);

require('./app/routes/todo.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});