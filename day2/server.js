
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

server.post('/api/items', function(req, res) {
    //code here to save the item

    var item = req.body;

    if(!item.price){
        res.status(400);
        res.send("Price is required to register a product.");
    }
    else{
        data.push(item);

        item.id = counter;
        count += 1;
        item.status = 'Saved!';

        res.status(201);
        res.json(item);
    }
});

// server.get('/test/1', (req, res) function(){
//     //solve the problem and reply with the result
    
//     //data
//     var nums = [81,3,1,543,-2,53,-28,897123,1,2,-9487745, 99];

//     //problem: find the greatest number in the array using a filter function

//     //your code


//     //result
//     res.send("Res: " + 3)

// });

server.listen(8080, function() {
    console.log("Server running at http:localhost:8080");
});