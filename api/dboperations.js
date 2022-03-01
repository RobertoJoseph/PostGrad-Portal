var config = require('./dbconfig')
const sql = require('mssql')
async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request()
        .input('input_parameter',sql.VarChar,"Roger")
        .query("Select * from Supervisor where firstName = @input_parameter");
        console.log(users.recordsets)
        return users.recordsets;
       

    }
    catch (erorr) {
        console.log(erorr);

    }
}
module.exports={
    getOrders:getOrders
}
