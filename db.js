var sql = require('mssql');

var dbConfig = {
    server: "localhost\\SQL2K14",
    database: "SampleDb",
    user: "sa",
    password: "sql2014",
    port: 1433
};

var conn = new sql.Connection(dbConfig);
var req = new sql.Request(conn);
conn.connect().then(function(){
	
        req.query("SELECT * FROM Party.Party").then(function (recordset) {
            console.log(recordset);
            conn.close();
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });        
})
.catch(function(err) {
	console.log(err);
});