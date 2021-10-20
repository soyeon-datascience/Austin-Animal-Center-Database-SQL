const pool = require('../database/database');

module.exports = (sendResponse) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('ERROR not able to get connection!!!');
            res.status(404);
            throw err;
        }
        // const sql = 'SELECT * FROM in_out_mega LIMIT 5';
        const sql = 'select age_upon_outcome, animal_id_outcome, date_of_birth, outcome_subtype, outcome_type, sex_upon_outcome, age_upon_outcome_days from in_out_mega LIMIT 100';
        connection.query(sql, function (error, results) {
            connection.release();
            if (error) {
                console.log('ERROR while running query !!!');
                res.status(404);
                throw error;
            }
            sendResponse(results);
        });
    });
}