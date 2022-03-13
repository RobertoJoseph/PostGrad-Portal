var config = require('../dbconfig')
const sql = require('mssql')


async function viewMyProfile(studentId) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().input("studentId", sql.Int, studentId).execute(`viewMyProfile`)).recordset;
        console.log(result);
        sql.close();
        return result;


    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

async function editMyProfile(firstname, lastname, password, email, address) {
    try {
        let pool = await sql.connect(config);
        const helper = (await pool.request()
            .input("email", sql.VarChar, email)
            .output("id", sql.Int, 0).output("Success", sql.Bit)
            .execute(`getIDbyEmail`));
        const userid = helper.output.id;
        const result = (await pool.request()
            .input("studentId", sql.Int, userid)
            .input("firstName", sql.VarChar, firstname)
            .input("lAStName", sql.VarChar, lastname)
            .input("pASsword", sql.VarChar, password)
            .input("email", sql.VarChar, email)
            .input("address", sql.VarChar, address)
            .execute(`editMyProfile`));
        console.log(result);
        sql.close();

    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

module.exports = {
    viewMyProfile,
    editMyProfile
}