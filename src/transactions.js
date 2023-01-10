const { camelizeKeys } = require('humps');
const pool = require('./db');


async function createTransaction(request, response) {
	console.log("Fun: createTransaction");

	const { amount, description, categoryId, currencyId } = request.body;

	try {
		const result = await pool.query(
			"INSERT INTO txn (amount, description, category_id, currency_id) VALUES ($1, $2, $3, $4) RETURNING id",
			[amount, description, categoryId, currencyId]
		);
		response.status(201).send(`Transaction added with ID: ${result.rows[0].id}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function getTransactions(request, response) {
	console.log("Fun: getTransactions");

	const { dateFrom, dateTo } = request.query;

	try {
		const transactions = await pool.query(
			`SELECT txn.id,
					txn.amount,
					txn.description,
					tc.name AS category,
					txn.created_at
			FROM   txn
					JOIN txn_category tc
					ON tc.id = txn.category_id
					ORDER BY id DESC`,
			// WHERE  txn.created_at BETWEEN $1 AND $2`,
			[]
		);
		response.status(200).json(camelizeKeys(transactions.rows));
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

async function deleteTransactionById(request, response) {
	console.log("Fun: deleteTransactionById");

	const { id } = request.params;

	try {
		const result = await pool.query(
			"DELETE FROM txn WHERE id = $1 RETURNING id",
			[id]
		);
		response.status(200).send(`Transaction deleted with ID: ${result.rows[0]?.id || id}`);
	} catch (error) {
		console.log(error);
		response.status(500).send();
	}
}

module.exports = {
	createTransaction,
	getTransactions,
	deleteTransactionById,
};