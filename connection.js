var mysql = require("mysql");

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME
});

con.connect(function(error){
    if(error) throw error;
    console.log("Connected successfully!");
});

module.exports = con;



