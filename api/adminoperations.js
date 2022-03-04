var config = require('./dbconfig')
const sql = require('mssql')

async function AdminListSup() {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().execute(`AdminListSup`)).recordset;
        console.log(result);
        sql.close();
        return result;

    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

async function AdminViewSupervisorProfile(supID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().input("supID", sql.Int, supID).execute(`AdminViewSupervisorProfile`)).recordset;
        console.log(result);
        sql.close();
        return result;


    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

async function AdminViewAllTheses() {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().execute(`AdminViewAllTheses`)).recordset;
        console.log(result);
        sql.close();
        return result;


    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

async function AdminViewOnGOingTheses() {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().output("ThesisCount",sql.Int,0).execute(`AdminViewOnGOingTheses`));
        console.log(result.output.ThesisCount);
        sql.close();
        return result.output.ThesisCount;


    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};


module.exports = {
    AdminListSup: AdminListSup,
    AdminViewSupervisorProfile: AdminViewSupervisorProfile,
    AdminViewAllTheses: AdminViewAllTheses,
    AdminViewOnGOingTheses: AdminViewOnGOingTheses
}