var config = require('./dbconfig')
const sql = require('mssql')


async function StudentRegister(firstname,lastname,password,faculty,gucian,email,address) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
        .input("firstname", sql.VarChar, firstname)
        .input("lastname",sql.VarChar,lastname)
        .input("password",sql.VarChar,password)
        .input("faculty",sql.VarChar,faculty)
        .input("gucian",sql.Bit,gucian)
        .input("email",sql.VarChar,email)
        .input("address",sql.VarChar,address)
        .execute(`StudentRegister`));
        console.log(result);
        sql.close();

    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

async function SupervisorRegister(firstname,lastname,password,faculty,email) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
        .input("firstName", sql.VarChar, firstname)
        .input("lastName",sql.VarChar,lastname)
        .input("pASsword",sql.VarChar,password)
        .input("faculty",sql.VarChar,faculty)
        .input("email",sql.VarChar,email)
        .execute(`SupervisorRegister`));
        console.log(result);
        sql.close();

    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

module.exports={
    StudentRegister,
    SupervisorRegister
}