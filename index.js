/* Require external APIs and start our application instance */
var express = require('express');
var app = express();
var request = require('request');

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    res.render('home');
});

/* The handler for the /results route */
app.get('/results', function(req, res){
	var query = req.query.search;
	var url = `https://openlibrary.org/api/books?bibkeys=ISBN:${query}&format=json&jscmd=data`;
	request(url, function(error, response, dataStream){
    console.log(dataStream);
    data = JSON.parse(dataStream);
		if (!error && response.statusCode == 200){
			console.log('data=', data[`ISBN:${query}`]);
			res.render('results', {data: data[`ISBN:${query}`]});
		}
	});
});

/* The handler for undefined routes */
app.get('*', function(req, res){
   res.render('error');
});

/* Start the application server */
app.listen(process.env.PORT || 3000, function(){
    console.log('Server has been started');
})
