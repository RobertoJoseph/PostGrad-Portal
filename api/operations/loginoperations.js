var config = require('../dbconfig')
const sql = require('mssql')

async function Login(email, password) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("email", sql.VarChar, email)
            .output("id", sql.Int, 0).output("Success", sql.Bit)
            .execute(`getIDbyEmail`));
        const userid = result.output.id;
        const foundEmail = result.output.Success;
        console.log(foundEmail);
        if (foundEmail) {
            const result = (await pool.request()
                .input("id", sql.Int, userid)
                .input("pASsword", sql.VarChar, password)
                .output("Success", sql.Bit, 0)
                .execute(`userLogin`));
            const successBit = result.output.Success;
            sql.close();
            console.log(successBit);
            return successBit;
        } else {
            sql.close();
            return false;
        }

    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};


module.exports = {
    Login
}