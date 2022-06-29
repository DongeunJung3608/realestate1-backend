const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 4000;

require('./app/routes/account.route.js')(app);


const mysql = require('mysql2');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '170319',
    database: 'realestate',
    multipleStatements: true
})

app.get('/trade', (req, res) => {
    const sql = `select * from trade_in_info`;
    connection.query(sql, (err1, res1) => {
        res.send(res1)
    })
})



app.listen(PORT, () => {
    console.log('server is working ', process.env.NODE_ENV); 
});