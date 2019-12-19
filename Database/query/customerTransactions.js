const sql = require('../mssqlConnector');
const mssql = require('mssql')

module.exports.findByUserName = async (data) => {
    const pool = await sql.getConnection();
    try {
        let result = await pool.request()
            .input('userName',mssql.VarChar, data.userName)
            .execute('SP_userInformation');
        return result;
    } catch (error) {
        return {status:404, message:error.originalError.info.message};
    }
}

module.exports.Register = async (data) => {
    const pool = await sql.getConnection();
    try {
        let result = await pool.request()
            .input('userName',mssql.VarChar,data.userName)
            .input('pw',mssql.NVarChar, data.pw)
            .input('firstName', mssql.VarChar, data.firstName)
            .input('lastName',mssql.VarChar, data.lastName)
            .input('userType', mssql.Int, data.userType)
            .execute('SP_register');
        return result;
    } catch (error) {
        return {status:404, message:error.originalError.info.message};
    }
}

module.exports.Login = async (data) => {
    const pool = await sql.getConnection();
    try {
        let result = await pool.request()
            .input('userName',mssql.VarChar,data.userName)
            .input('pw', mssql.NVarChar,data.pw)
            .execute('SP_login')
        return result;
    } catch (error) {
        return {status:404, message:error.originalError.info.message};
    }
}