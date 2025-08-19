const mongoose = require('mongoose');

const HistoricalSalesSchema = new mongoose.Schema({
  Week: { type: Number, required: true },
  FinancialYear: { type: String, required: true },
  Total: { type: Number, required: true },
  Branch: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HistoricalSales', HistoricalSalesSchema);
