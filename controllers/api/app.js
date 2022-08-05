const express = require ('express')
const mysql2 = require ('mysql2'); 

//Create a connection 
const db = mysql2.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Mdh10102001',
    database : 'realtor_db'
});

// Connect
db.connect((err) => {
if(err){
    throw err;
}
console.log('MySql Connected...');
});

const app = express();

// Create table
app.get('/createpoststable', (req, res) =>{
let sql = 'CREATE TABLE searches(id int AUTO_INCREMENT, user VARCAR(255), PRIMARY KEY (id))'
db.query(sql, (err, result) => {
if(err) throw err;
// console.log(result);
// res.send('Posts table created...');
res.status(200).json(result);
})
});


app.listen('3001', () => {
    console.log('Server startd on port 3001');
});