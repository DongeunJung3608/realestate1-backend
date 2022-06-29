const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '170319',
    database: 'realestate',
    multipleStatements: true
})

module.exports = app => {
    app.get('/trade', (req, res) => {
        const sql = `select * from trade_in_info`;
        connection.query(sql, (err1, res1) => {
            res.send(res1)
        })
    })

    app.get('/trade_detail', (req, res) => {
        const {idf_num, year} = req.query;
        const getTradeDetail = `select * from trade_in_info where idf_num = ${idf_num} and year=${year}`;
        connection.query(getTradeDetail, (getTradeDetailErr, getTradeDetailRes) => {
            if (getTradeDetailErr) {
                return res.status(404).send({ message: 'This data does not exist.' })
            } else {
                return res.status(200).send({ result: getTradeDetailRes });
            }
        })
        // const sql = `select * from trade_in_info`;
        // connection.query(sql, (err1, res1) => {
        //     res.send(res1)
        // })
    })
}
