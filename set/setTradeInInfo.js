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
const excelData = XLSX.readFile('building_new.xlsx');

const jsonData = Object.keys(excelData.Sheets).map(name => ({
    name,
    data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
}));

console.log(jsonData[0]['data'][0])

jsonData[0]['data'].forEach(data => {
    const primary_key = data.Var1.split('_');
    const year = parseInt(primary_key[0]); // 1
    const idf_num = parseInt(primary_key[1]); // 2

    const address1 = data.Var2; // 3
    const address2 = data.Var3; // 4

    const zoning1 = data.Var4; // 5
    const zoning2 = data.Var5; // 6

    const square_metre = parseFloat(data.Var6); // 7

    const price_array = data.Var7.split(',');
    let price_string = '';
    price_array.forEach(p => price_string = price_string + p);
    const price = parseInt(price_string); // 8

    const floor = data.Var8 ? parseInt(data.Var8) : null; // 9

    const year_month = data.Var9;
    const trade_in_year = year_month ? parseInt(year_month[0] + year_month[1] + year_month[2] + year_month[3]) : null; // 10
    const tarde_in_month = year_month ? parseInt(year_month[5] + year_month[6]) : null; // 11

    const sql = `insert into trade_in_info values (${year}, ${idf_num}, "${address1}", "${address2}", "${zoning1}", "${zoning2}", ${square_metre}, ${price}, ${floor}, ${trade_in_year}, ${tarde_in_month})`;

    connection.query(sql, (err, res) => console.log(err, res));
})
