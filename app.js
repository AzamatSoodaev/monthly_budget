const express = require('express');
const bodyParser = require('body-parser');
const {
	createTransaction,
	getTransactions,
	deleteTransactionById,
} = require('./src/transactions');

const {
	getCustomerData,
	createTxnCategories,
	updateTxnCategoryById,
	deleteTxnCategories,
} = require('./src/transactionCategories');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// TODO: validate inputs
app.post('/transactions', createTransaction);
app.get('/transactions', getTransactions);
app.delete('/transactions/:id', deleteTransactionById);

app.post('/transactions/category', createTxnCategories);
app.put('/transactions/category', updateTxnCategoryById);
app.delete('/transactions/category', deleteTxnCategories);

app.get('/customerData', getCustomerData);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});