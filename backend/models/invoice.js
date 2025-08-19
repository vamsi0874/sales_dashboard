const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  entityName: String,
  branchRegion: String,
  branch: String,
  division: String,
  dueDate: Date,
  topLevelCustomerId: Number,
  topLevelCustomerName: String,
  customerId: Number,
  customer: String,
  billingGroupId: Number,
  billingGroup: String,
  invoiceId: Number,
  invoiceNumber: String,
  issueDate: Date,
  total: Number,
  outstanding: Number,
  delivery: String,
  status: String
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
