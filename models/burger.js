//burger.js must match burgersController.js must match orm.js


// require in the orm file that will talk to the database
var orm = require("../config/orm.js");

// create the burger variable that will be exported back to the controller
var burger = {
	// selectAll for getting all the burgers
	//(all)
	selectAll: function(cb) {
		orm.selectAll('burgers', function(res) {
			cb(res);
		});
	},
	// insertOne for adding a new burger
	//(create)
	insertOne: function(cols, vals, cb) {
		orm.insertOne('burgers', cols, vals, function(res) {
			cb(res);
		});
	},
	// updateOne for changing the burger status
	//(update)
	updateOne: function(objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, function(res) {
			cb(res);
		});
	},

	// delete: function(condition, cb) {
 //    orm.delete("burgers", condition, function(res) {
 //      cb(res);
 //    });
 //  }
};


// export burger back to the controller
module.exports = burger;

