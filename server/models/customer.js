const mongoose = require ('mongoose');

const CustomerSchema = mongoose.Schema({
  customer_id :{type: Number, required: true},
  customer_name: { type: String, required: true },
  customer_address:  String ,
  contact_no :  String,
});

CustomerSchema.index({ customer_name: -1 });

const Customer = mongoose.model(
  'Customer',
  CustomerSchema
);

module.exports = Customer;
