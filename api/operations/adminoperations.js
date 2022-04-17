var config = require('./dbconfig')
const sql = require('mssql')



// async function AdminViewSupervisorProfile(supID) {
//     try {
//         let pool = await sql.connect(config);
//         const result = (await pool.request().input("supID", sql.Int, supID).execute(`AdminViewSupervisorProfile`)).recordset;
//         console.log(result);
//         sql.close();
//         return result;


//     } catch (erorr) {
//         console.log(erorr);
//         sql.close();
//     }
// };

// async function AdminViewAllTheses() {
//     try {
//         let pool = await sql.connect(config);
//         const result = (await pool.request().execute(`AdminViewAllTheses`)).recordset;
//         //console.log(result);
//         sql.close();
//         return result;


//     } catch (erorr) {
//         console.log(erorr);
//         sql.close();
//     }
// };

// async function AdminViewOnGOingTheses() {
//     try {
//         let pool = await sql.connect(config);
//         const result = (await pool.request().output("ThesisCount",sql.Int,0).execute(`AdminViewOnGOingTheses`));
//         console.log(result.output.ThesisCount);
//         sql.close();
//         return result.output.ThesisCount;


//     } catch (erorr) {
//         console.log(erorr);
//         sql.close();
//     }
// };

exports.viewAdminProfile = async function (req, res) {
    try {
        let pool = await sql.connect(config);
        const result = (
            await pool
                .request()
                .input("id", sql.Int, req.params.adminID)
                .execute(`viewAdminProfile`)
        ).recordset;
        res.send(result);
    } catch (err) {
        console.log(err);
        sql.close();
    }
};

exports.AdminListSup = async function (req, res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().execute(`AdminListSup`)).recordset;
        res.send(result);
    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

exports.AdminViewStudentThesisBySupervisor = async function (req, res) {
    try {
        let pool = await sql.connect(config);
        const result = (
            await pool
                .request()
                .input("supervisorID", sql.Int, req.params.supervisorID)
                .execute(`AdminViewStudentThesisBySupervisor`)
        ).recordset;
        res.send(result);
    } catch (err) {
        console.log(err);
        sql.close();
    }
};

exports.AdminViewAllTheses = async function (req, res) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request().execute(`AdminViewAllTheses`)).recordset;
        res.send(result);
    } catch (erorr) {
        console.log(erorr);
        sql.close();
    }
};

exports.AdminUpdateExtension = async function (req, res) {
    try {
      let pool = await sql.connect(config);
      const result = await pool
        .request()
        .input("ThesisSerial", sql.Int, req.params.serialNumber)
        .execute(`AdminUpdateExtension`);
      res.send({ isIncremented: true });
    } catch (error) {
      console.log(error);
      sql.close();
    }
  };



// module.exports = {
//     AdminListSup: AdminListSup,
//     AdminViewSupervisorProfile: AdminViewSupervisorProfile,
//     AdminViewAllTheses: AdminViewAllTheses,
//     AdminViewOnGOingTheses: AdminViewOnGOingTheses
// }