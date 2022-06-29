const { json } = require('express');
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '170319',
    database: 'realestate',
    multipleStatements: true
})

// year idf_num address1 address2 zoning1 zoning2 square_metre price floor trade_in_year trade_in_month

// const sql = `insert into trade_in_info values (2006, 2, "강남구1", "강남구2", "쿠닝1", "쿠닝2", 43, 12000, 10, 2006, 1);`;

// connection.query(sql, (err, res) => {
//     console.log(err);
//     console.log(res);
// })

const XLSX = require('xlsx');
const excelData = XLSX.readFile('vacancy_rate_new.xlsx');

const jsonData = Object.keys(excelData.Sheets).map(name => ({
    name,
    data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
}));

console.log(jsonData[0]['data'][0])

jsonData[0]['data'].forEach(data => {
    const idf_key = data.Var1;

    const region = data.Var2; // 3
    const year = data.Var3; // 4

    const quarter = data.Var4; // 5
    const vacancy = data.Var5; // 6

    const sql = `insert into vacancy_rate values (${idf_key}, "${region}", ${year}, ${quarter}, ${vacancy})`;

    connection.query(sql, (err, res) => console.log(err, res));
})
