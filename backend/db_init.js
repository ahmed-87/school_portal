let mysql = require('mysql');



let creatDatabase = function(connection, dbName) {

 
    connection.connect(function(err){
        if (err) throw err;
        console.log('Connected');
    
     
        connection.query("CREATE DATABASE " + dbName, function(err, result){
            if (err) throw err;
            console.log("Database with name " + dbName + " is created!!!")

        });


        connection.query("USE " + dbName, function(err, result){
                
        });

        let table = {
            name: 'students',
            fields: ['id', 'full_name', 'score']
        };


        let query_str = "CREATE TABLE " + table.name + " ( " + 
        table.fields[0] + " INT AUTO_INCREMENT PRIMARY KEY, " + 
        table.fields[1] + " VARCHAR(255), " + 
        table.fields[2] + " FLOAT) ";

        connection.query(query_str, function (err, result) {
            if (err) throw err;
            console.log("Table " + table.name + " created!!!");

        });


        let initialData = [
            {name: 'Alex Scott', score: 75},
            {name: 'Katie Anderson', score: 80},
            {name: 'John Mask', score: 90},
            {name: 'Ali Scott', score: 55},
            {name: 'Brittany Doglass', score: 65},
        ];

        let statement = [
            'INSERT INTO', 
            table.name, 
            '(' + table.fields[1] + ', ' + table.fields[2] + ')',
            'VALUES'
        ];
    
        let values = []
        for(let data of initialData){
            let dataStr = '("' + data.name + '", ' + data.score + ')';
            values.push(dataStr);
        }
    

        connection.query(statement.join(' ') + ' ' + values.join(', '), function (err, result) {
            if (err) throw err;
            console.log("record(s) inserted");
        });


        connection.end();
    });


    

    
};





let db_config = {
    host: 'ass-mysql',
    // port: 3306,
    user: 'root',
    password: 'mysql-password'
}


let connection = mysql.createConnection(db_config);

let dbName = 'client_db';
creatDatabase(connection, dbName);

