const sql = require('../mssqlConnector');
const mssql = require('mssql');

module.exports.comments = async (data) => {
    const pool = await sql.getConnection();
    try {
        let result = await pool.request()
            .input('comment', mssql.VarChar,data.comment)
            .input('userID',mssql.Int, data.userID)
            .execute('SP_addComment');
    } catch (error) {
        return { status: 404, message: error.originalError.info.message };
    }
}