const pool = require('./db');
const { getCurrencies } = require('./currencies');


async function getTxnCategories() {
	console.log("Fun: getTxnCategories");

	try {
		const result = await pool.query(
			"SELECT id, name FROM txn_category",
			[]
		);
		return result.rows;
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function createTxnCategories(request, response) {
	console.log("Fun: createTxnCategories");

	const { name } = request.body;

	try {
		const result = await pool.query(
			"INSERT INTO txn_category (name) VALUES ($1) RETURNING id",
			[name]
		);
		response.status(201).send(`Transaction category added with ID: ${result.rows[0].id}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function deleteTxnCategoryById(request, response) {
	console.log("Fun: deleteTxnCategoryById");

	const { id } = request.params;

	try {
		const result = await pool.query(
			"DELETE FROM txn_category WHERE id = $1 RETURNING id",
			[id]
		);
		response.status(200).send(`Transactions category deleted with ID: ${JSON.stringify(result.rows[0]?.id || id)}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function updateTxnCategoryById(request, response) {
	console.log("Fun: updateTxnCategoryById");

	const { id } = request.params;
	const { name } = request.body;

	try {
		const result = await pool.query(
			"UPDATE txn_category SET name = $2 WHERE id = $1",
			[id, name]
		);
		response.status(200).send(`Transactions updated with ID: ${JSON.stringify(result.rows[0]?.id || id)}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function getCustomerData(request, response) {
	console.log("Fun: getCustomerData");

	try {
		const currencies = await getCurrencies();
		const txnCategories = await getTxnCategories();
		const customerData = {
			currencies,
			txnCategories,
		};
		response.status(200).json(customerData);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getCustomerData,
	createTxnCategories,
	deleteTxnCategoryById,
	updateTxnCategoryById,
};