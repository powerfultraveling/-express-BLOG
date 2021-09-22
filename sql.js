var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "powerfultraveling",
  password: "1111"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE my_blog", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});