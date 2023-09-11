var mysql = require("mysql");

var con = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'internshala'
});

con.connect(function(error){
    if(error) throw error;
    console.log("Connected successfully!");
});

module.exports = con;



