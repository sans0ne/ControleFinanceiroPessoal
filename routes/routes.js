const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js')

transactionRouter.get('/',transactionService.allTransactions)
transactionRouter.post('/',transactionService.create)
transactionRouter.put('/:id',transactionService.update)
transactionRouter.delete('/:id',transactionService.delete)

module.exports = transactionRouter;
