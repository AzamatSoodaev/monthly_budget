const express = require('express');
const bodyParser = require('body-parser');
const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');
const {
	createTransaction,
	getTransactions,
	deleteTransactionById,
} = require('./src/transactions');

const {
	getCustomerData,
	createTxnCategories,
	updateTxnCategoryById,
	deleteTxnCategoryById,
} = require('./src/transactionCategories');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.post(
	'/transactions',
	body('amount').isNumeric(),
	body('description').isString().isLength(),
	body('categoryId').isInt(),
	body('currencyId').isInt(),
	validationErrorHandler,
	createTransaction
);
app.get('/transactions', getTransactions);
app.delete(
	'/transactions/:id',
	param('id').isInt(),
	validationErrorHandler,
	deleteTransactionById
);

app.post(
	'/transactions/category',
	body('name').isString(),
	validationErrorHandler,
	createTxnCategories
);
app.put(
	'/transactions/category/:id',
	param('id').isInt(),
	body('name').isString(),
	validationErrorHandler,
	updateTxnCategoryById
);
app.delete(
	'/transactions/category/:id',
	param('id').isInt(),
	validationErrorHandler,
	deleteTxnCategoryById
);

app.get('/customerData', getCustomerData);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});

function validationErrorHandler(request, response, next) {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	} else {
		next();
	}
}