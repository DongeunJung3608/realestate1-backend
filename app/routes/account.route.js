const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '170319',
    database: 'realestate',
    multipleStatements: true
})

module.exports = app => {
    app.get('/account/login', (req, res) => {
        const {email, password} = req.query;
        const userCheck = `select count(*) as userExist from account where email = '${email}'`;
        const passwordCheck = `select count(*) as passwordRight from account where email = '${email}' and password = md5('${password}')`;
        connection.query(userCheck, (userCheckErr, userCheckRes) => {
            if (userCheckRes[0].userExist < 1) { // there is no such user in database.
                return res.status(404).send({ message: 'The user does not exist.' })
            } else { // 
                connection.query(passwordCheck, (passwordCheckErr, passwordCheckRes) => {
                    if (passwordCheckRes[0].passwordRigth < 1) {
                        return res.status(404).send({ message: 'Check your password.' })
                    } else {
                        return res.status(200).send({ accessToken: 0 });
                    }
                })
            }
        });
    })
    app.post('/account/join', (req, res) => {
        console.log('/account/join is called');
        const {email, password} = req.query;
        const userCheck = `select count(*) as userExist from account where email = '${email}'`;
        const createAccount = `insert into account (email, password) values ('${email}', md5('${password}'))`;

        connection.query(userCheck, (userCheckErr, userCheckRes) => {
            if (userCheckRes[0].userExist > 0) { // there is no such user in database.
                return res.status(404).send({ message: 'The email already exists.' })
            } else { // 
                connection.query(createAccount, (createAccountErr, createAccountRes) => {
                    return res.status(200).send({ result: createAccountRes });
                })
            }
        });
    })
    app.post('/account/passwordReset', (req, res) => {
        console.log('/account/passwordreset is called');
    })
}
