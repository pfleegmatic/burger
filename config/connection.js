// Creation of database connection
var mysql = require("mysql");

//SQL CONNECTION
var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Impetus2Chaos#",
  database: "burger_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;





///HEROKU CONNECTION
// var connection;
	
// // add in the environment variable option for JAWSDB for heroku
if (process.env.JAWSDB_URL) {
connection = mysql.createConnection(process.env.JAWSDB_URL);
 } else {
 		connection = mysql.createConnection({
 			host: "localhost",
 			user: "root",
 			password: "Impetus2Chaos#",
 			database: "burgers_db"
 		});
 	};
	

// connection.connect(function(err) {
// 	if (err) {
// 		console.error("error conencting: " + err.stack);
// 		return;
// 	}
// 	console.log("connected as id " + connection.threadId);
// });

// // export the connection back to orm
connection.connect();
module.exports = connection;
