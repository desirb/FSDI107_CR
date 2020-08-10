
var express = require('express');
var server = express();

/************Server Configuration*************/
//render html from endpoints
var ejs = require('ejs');
server.set('views', __dirname + "/public");
server.engine('html', ejs.renderFile);
server.set('view engine', ejs);

/* STATIC files for the server (js, css, img, pdf, doc, etc.) */
server.use(express.static(__dirname + "/public"));

/* body parse to read playload (ajax data) directly to object */
var bparser = require('body-parser');
server.use(bparser.json());

/* Mongo DB connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var mongoDB = mongoose.connection;
var itemConstructor;

/************Web Server*************/
server.get('/', function(request, respond) {
    respond.render("index.html");
});

server.get('/admin', function(request, respond) {
    respond.render('admin.html');
});

server.get('/about', function(request, respond) {
    respond.render('about.html');
});

server.get('/contact', function(request, respond) {
    respond.send("Coming soon to a browser near you!");
});

/************REST API*************/

var data = [];
var counter = 1;

//get all
server.post('/api/items', function(req, res) {
    //code here to save the item

    var item = req.body;

    if(!item.price){
        res.status(400);
        res.send("Price is required to register a product.");
    }
    else{
        var itemFormDB = itemConstructor(item);
        itemFormDB.save((error, savedItem) => {
            if(error){
                res.status(500);
                res.send(error);
            }

            res.status(201);
            res.json(savedItem);
        });

        // item.id = counter; //or cnt
        // count += 1;
        // item.status = 'Saved!';
    }
});

//get by name
server.get('/api/items/:user', (req, res) => {
    let name = req.params.user;

    itemConstructor.find({ user: name }, (error, data) => {
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(data);
    });
});

server.delete('/api/items', (req, res) => {
    var id2Remove = req.body.id;
    itemConstructor.deleteOne({ _id: id2Remove}, (error) => {
        
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.send("Removed.");
    });
});

server.get('/test/1', (req, res) =>{
    //solve the problem and reply with the result
    
    //data
    var nums = [81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99];

    //problem: find the greatest number in the array using a filter function

    //your code


    //result
    res.send("Res: " + 3)

});

server.get('/test/2', (req, res) => {
    //solve the problem and reply with the result
    
    //data
    var nums = [81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99];

    //problem: find the greatest number in the array using a filter function

    //your code
    var positives = nums.filter(n => n >= 0);




    //result
    res.send("Res: " + 3)

});


mongoDB.on('error', (error) => {
    console.log("Error connecting to the database.")
});

mongoDB.on('open', () => {
    console.log("Up and running!");

    // predefined schema for mongoDB attributes we are saving
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        category: String,
        image: String,
        user: String,
    });

     itemConstructor = mongoose.model('itemsCh10', itemSchema);
});


server.listen(8080, function() {
    console.log("Server running at http:localhost:8080");
});