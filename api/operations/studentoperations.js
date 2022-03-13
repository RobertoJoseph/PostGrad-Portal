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

async function addUndergradID(studentId, undergradID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentId)
            .input("undergradID", sql.VarChar, undergradID)
            .execute(`addUndergradID`));
        console.log(result);
        sql.close();
    }
    catch (error) {
        console.log(error);
        sql.close();
    }
}

async function ViewCoursesGrades(studentID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentID)
            .execute(`ViewCoursesGrades`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}
async function ViewCoursePaymentsInstall(studentID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentID)
            .execute(`ViewCoursePaymentsInstall`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

async function ViewThesisPaymentsInstall(studentID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentID)
            .execute(`ViewThesisPaymentsInstall`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

async function ViewUpcomingInstallments(studentID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentID)
            .execute(`ViewUpcomingInstallments`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}

async function ViewMissedInstallments(studentID) {
    try {
        let pool = await sql.connect(config);
        const result = (await pool.request()
            .input("studentID", sql.Int, studentID)
            .execute(`ViewMissedInstallments`)).recordset;
        console.log(result);
        sql.close();
        return result;
    } catch (error) {
        console.log(error);
        sql.close(error);
    }
}
module.exports = {
    viewMyProfile,
    editMyProfile,
    addUndergradID,
    ViewCoursesGrades,
    ViewCoursePaymentsInstall,
    ViewThesisPaymentsInstall,
    ViewUpcomingInstallments,
    ViewMissedInstallments
}