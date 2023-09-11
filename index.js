var con = require('./connection');
var express = require("express");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/form.html');
});

app.post('/', function (req, res) {
    var { name, email_id, gender, address, state, city, pincode } = req.body;

    var sql1 = "INSERT INTO `users` (`Name`, `Email_id`, `Gender`) VALUES (?, ?, ?)";
    con.query(sql1, [name, email_id, gender], function (error, result1) {
        if (error) throw error;
        var user_Id = result1.insertId;

        var sql2 = "INSERT INTO `address` (`Address`, `State`, `City`,`Pincode`,`User_id`) VALUES (?, ?, ?, ?,?)";
        con.query(sql2, [address, state, city, pincode,user_Id,], function (error, result2) {
            if (error) throw error;
            // res.redirect('/data');
        });
    });
});

app.get('/view-data', function (req, res) {
    var sql1 = "SELECT * FROM users";
    var sql2 = "SELECT * FROM address";

    con.query(sql1, function (error1, usersResult) {
        if (error1) console.log(error1);

        con.query(sql2, function (error2, addressResult) {
            if (error2) console.log(error2);

            var data = {users: usersResult,address: addressResult};
            res.render(__dirname + "/data", data);
        });
    });
});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});

