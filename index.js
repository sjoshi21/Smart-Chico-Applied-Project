var PORT = 4569;

var body_parser = require('body-parser');
var express = require('express')
var app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(body_parser.json());
app.set('views', 'app/views');
app.set('view engine', 'ejs');

//1.
var sql = require('mssql');
//2.
var config = {
    server: 'localhost',
    database: 'chico',
    user: 'Soumya',
    password: 'secret',
    port: 1433
};
//3.
/*function loadEmployees() {
    //4.
    var dbConn = new sql.ConnectionPool(config);
    //5.
    dbConn.connect().then(function () {
        //6.
        var request = new sql.Request(dbConn);
        //7.
        request.query("select * from Party.Email").then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        //9.
        console.log(err);
    });
}
//10.
//loadEmployees();*/

app.get('/', (req, res) => {
    res.render('index', {data:{x:1, y:2}});
    console.log("----------------");
});

app.post('/register', function(req, res) {
	console.log(req.body.Email);
    console.log(req.body.Password);
    console.log(req.body.Name);
    console.log(req.body.Entity);
    var dbConn = new sql.ConnectionPool(config);
    //3.
    dbConn.connect().then(function () {
        //4.
        var transaction = new sql.Transaction(dbConn);
        //5.
        transaction.begin().then(function () {
            
            var request = new sql.Request(transaction);
            
           
request.query("Insert into dbo.Userregister1 (Name,Email,PasswordHash,EntityType,Includeinlisting) values ('"+req.body.Name+"', '"+req.body.Email+"','"+req.body.Password+"', '"+req.body.Entity+"','"+req.body.Contractor+"')").then(function () {
                //8.
                transaction.commit().then(function (recordSet) {
                    console.log(recordSet);
                    dbConn.close();
                }).catch(function (err) {
                    //9.
                    console.log("Error in Transaction Commit " + err);
                    dbConn.close();
                });
            });
        })
    });
    
    res.send('successfully registered');
	res.end();
});

app.listen(PORT, function () {
  console.log('Server Started. You can access the editor from http://localhost:' + PORT)
})