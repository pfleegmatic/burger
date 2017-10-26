	//burgersController.js must match orm.js


	// require in express, and set up routing for it, and bring in
	// the burger.js model file
	var express = require("express");
	var router = express.Router();
	var burger = require("../models/burger.js");
	
	// add a '/' endpoint that redirects to the /index route
	router.get('/', function(req, res) {

  		// burger.all(function(data) {
	    // var hbsObject = {
	    //   burgers: data
	    // };
	    // console.log(hbsObject);

		res.redirect("/index");
	});
	
	// add a '/index/' endpoint that gets all the burgers
	// then renders the index file by passing in all the burgers
	// as an object for handlebars to use

	//(all)
	router.get('/index', function(req, res) {
		burger.selectAll(function(data) {
			var hbsObject = {burgers: data};
			console.log(hbsObject);
			res.render('index', hbsObject);
		});
	});
	
	// add a '/burgers/insertOne' endpoint that posts the 
	// burger name the user entered then as a callback it
	// redirects back to the /index route

	//(create)
	router.post('/burgers/insertOne', function(req, res) {
		burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function() {
			res.redirect('/index');
		});
	});
	
	// add a '/burgers/updateOne/:id' route that updates
	// the status of the burger from being uneaten to eaten
	// then does a callback that redirects to the /index endpoint

	//(update)
	router.put('/burgers/updateOne/:id', function(req, res) {
		var condition = 'id = ' + req.params.id;
		console.log('condition', condition);
	
		burger.updateOne({devoured: req.body.devoured}, condition, function() {
			res.redirect('/index');
		});
	});

	//==========================
	
	router.delete("/api/cats/:id", function(req, res) {
  	var condition = "id = " + req.params.id;

  	burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

	// export the router (controller) back to the server
	module.exports = router;

