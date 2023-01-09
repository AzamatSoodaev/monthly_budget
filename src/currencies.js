const pool = require('./db');


async function getCurrencies() {
	console.log("Fun: getCurrencies");
	try {
		const results = await pool.query(
			"SELECT id, name FROM currencies",
			[]
		);
		return results.rows;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getCurrencies,
};