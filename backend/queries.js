const Pool = require('pg').Pool
const pool = new Pool({
    user: 'rms',
    host: 'localhost',
    database: 'rms',
    password: 'admin',
    port: 5432,
});

async function getResult(params) {

    try {
        const query = 'SELECT country_region, SUM(confirmed) as confirmed, SUM(deaths) as deaths,' +
            ' SUM(recovered) as recovered FROM covid_observations WHERE observation_date = $1 GROUP BY country_region ORDER BY confirmed DESC LIMIT $2 ';
        const res = await pool.query(query, params)
        return res.rows;
    } catch (err) {
        console.log(err.stack)
    }
}

async function createRecord(params) {

    try {
        const query = 'INSERT INTO covid_observations (s_no, observation_date, province_state, country_region, last_update,' +
            ' confirmed, deaths,  recovered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const res = await pool.query(query, params)
    } catch (err) {
        console.log(err.stack)
    }
}

async function deleteRecords(params) {

    try {
        const query = 'DELETE from covid_observations';
        const res = await pool.query(query)
    } catch (err) {
        console.log(err.stack)
    }
}


module.exports = {
    getResult,
    createRecord,
    deleteRecords,
}