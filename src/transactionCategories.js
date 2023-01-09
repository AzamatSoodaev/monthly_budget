const pgFormat = require("pg-format");
const pool = require('./db');
const { getCurrencies } = require('./currencies');


async function getTxnCategories() {
	console.log("Fun: getTxnCategories");

	try {
		const results = await pool.query(
			"SELECT id, name FROM txn_category",
			[]
		);
		return results.rows;
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function createTxnCategories(request, response) {
	console.log("Fun: createTxnCategories");

	try {
		const { name } = request.body;
		const results = await pool.query(
			"INSERT INTO txn_category (name) VALUES ($1) RETURNING id",
			[name]
		);
		response.status(201).send(`Transaction category added with ID: ${results.rows[0].id}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function deleteTxnCategories(request, response) {
	console.log("Fun: deleteTxnCategories");

	try {
		const { ids } = request.body;
		const results = await pool.query(
			pgFormat("DELETE FROM txn_category WHERE id IN ($1) RETURNING id", ids),
			[ids]
		);
		response.status(200).send(`Transactions category deleted with ID: ${JSON.stringify(results.rows)}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function updateTxnCategoryById(request, response) {
	console.log("Fun: updateTxnCategoryById");

	try {
		const { id, name } = request.body;
		const results = await pool.query(
			"UPDATE txn_category SET name = $1 WHERE id = $2",
			[id, name]
		);
		response.status(200).send(`Transactions updated with ID: ${JSON.stringify(results.rows)}`);
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
	deleteTxnCategories,
	updateTxnCategoryById,
};