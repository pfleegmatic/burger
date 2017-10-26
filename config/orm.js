  // import in the connection mysql database
  var connection = require("../config/connection.js");
  
// Create helper function for SQL syntax.
// Pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

  // a function that will be used to build queries
  function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  }
  
  // another function for building queries
  function objToSql(ob) {
    var arr = [];
  
  // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      if (ob.hasOwnProperty(key)) {

    // // check to skip hidden properties
    // if (Object.hasOwnProperty.call(ob, key)) {
    //   // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
    //   if (typeof value === "string" && value.indexOf(" ") >= 0) {
    //     value = "'" + value + "'";
    //   }
        
    // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + ob[key]);
      }
    }
  
  // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  // define our orm that will be exported to the burgers.js model
  var orm = {
    // selectAll function for grabbing everything from the table
    //(all) 
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        // sends query result back to callback function
        cb(result);
      });
    },
    // insertOne function for inserting one burger into table
    //(create) 
    insertOne: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      // queryString += vals[0] + ' , ' + vals[1];
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
      console.log(vals);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        // send query result back to callback function
        cb(result);
      });
    },
  
    // update one function for changing a burger status
    //(update)
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
  
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        // send the query result back to the callback function
        cb(result);
      });
    }

  //   delete: function(table, condition, cb) {
  //   var queryString = "DELETE FROM " + table;
  //   queryString += " WHERE ";
  //   queryString += condition;

  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }

  //     cb(result);
  //   });
  // }
};



  
  // export the orm back to the model burger.js
  module.exports = orm;

