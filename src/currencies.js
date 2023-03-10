const pool = require('./db');


async function getCurrencies() {
	console.log("Fun: getCurrencies");
	try {
		const result = await pool.query(
			"SELECT id, name FROM currencies",
			[]
		);
		return result.rows;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getCurrencies,
};