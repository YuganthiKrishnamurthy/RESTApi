const mysql = require('mysql'); 
const express = require('express'); 
const app = express();
 app.use(express.json()); 
 var mysqlConnection = mysql.createConnection({
      host: 'krishnamurthy.chhjeemqyain.us-east-1.rds.amazonaws.com', 
      user: 'root',
       password: 'password', 
       database: 'krishnamurthy' });
/* SQL Connection*/ 
mysqlConnection.connect((err) => { 
    if (!err) console.log('connection successful');
     else console.log('connection failed \n Error:' + JSON.stringify(err)); });
/* GET Request*/ /* Getting information on all jobs*/ 
app.listen(3000, () => console.log('listeneing on port 3000....'));
 app.get('/api/jobs935', (req, res) => {
    mysqlConnection.query('select * from jobs935', (err, rows, fields) => {
        if (!err) {res.send(rows);console.log(rows);}
        else res.send(err);
    })
});  
 /* getting information on a particular job with particular partID*/ 
 app.get('/api/jobs935/:jobName/:partID', (req, res) => {
    mysqlConnection.query('select * from jobs935 where jobName=? and partID=?', [req.params.jobName, req.params.partID], (err, rows, fields) => {
        if (!err)
         { 
             if (rows.length != 0) 
             res.send(rows); 
             else
              res.send('does not exist'); 
            } 
            else 
            res.send(err);
    })
});
/* POST Request*/ 
app.post('/api/jobs935/:jobName/:partID', (req, res) => {
    var newvalue = [[req.params.jobName, req.params.partID, req.body.qty]]; mysqlConnection.query('select * from jobs935 where jobName=? and partID=?', [req.params.jobName, req.params.partID], (err, rows, fields) => {
        if (!err) {
            if (rows.length != 0) 
            res.send('already exists'); 
            else {
                mysqlConnection.query('insert into jobs935(jobName,partID,qty) values?', [newvalue], (err, rows, fields) => {
                    if (!err)
                     {
                          res.send(rows);
                         }
                    else res.send(err);
                });
            }
        } else 
        res.send(err);
    })
});
/* PUT Request*/ 
app.put('/api/jobs935/:jobName/:partID', (req, res) => {
    var newvalue = [[req.params.jobName, req.params.partID, req.body.qty]]; 
    mysqlConnection.query('select * from jobs935 where jobName=? and partID=?', [req.params.jobName, req.params.partID], (err, rows, fields) => {
        if (!err) {
             if (rows.length != 0)
              { 
                  mysqlConnection.query('update jobs935 set qty=? where jobName=? and partID=?', [[req.body.qty], [req.params.jobName], [req.params.partID]], (err, rows, fields) => { if (!err) { res.send(rows); } else res.send(err); }); } else { res.send('does not exist'); } } else res.send(err);
    })
});