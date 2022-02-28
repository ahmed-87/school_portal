const dbConfig = {
    host: 'ass-mysql',
    // port: 3306,
    user: 'root',
    password: 'mysql-password',
    database: 'client_db'
}

const tableName = 'students';
const mysql = require('mysql');

let createConnection = function(dbConfig) {
    
    const connection = mysql.createConnection(dbConfig);

    return connection;
};



const express = require('express');
const cors = require('cors')
const app = express();
const appPort = 8081;
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get("/students", cors(), function(req, res){


    try{
        const connection = createConnection(dbConfig);

        const query = "SELECT * FROM " + tableName;
        let output = null;
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
           
    
            connection.query(query, function (err, result) {
              if (err) throw err;
              
              console.log(result);
              res.send(result);
              res.end();
            });
    
            connection.end();
        });
        
    
    }catch (error){
        console.log(error);

        res.send(error);
        res.end();
    }
});


app.listen(appPort, function() {
    console.log('Server is running on port ' + appPort);
});

