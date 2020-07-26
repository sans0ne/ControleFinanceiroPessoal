const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type:String,
    required: true
  },
  value: {
    type:Number,
    required: true
  },
  category: {
    type:String,
    required: true
  },
  year: {
    type:String,
    required: true
  },
  month: {
    type:String,
    required: true
  },
  day: {
    type:String,
    required: true
  },
  yearMonth: {
    type:String,
    required: true
  },
  yearMonthDay: {
    type:String,
    required: true
  },
  type: {
    type:String,
    required: true
  },
});

const TransactionModel = mongoose.model('transactions', schema);

module.exports = TransactionModel;
