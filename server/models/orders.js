const mongoose = require ('mongoose');

const OrdersSchema = mongoose.Schema({
  sr_no :{type: Number, required:true},
  customer_name :{type: String, required:true},
  product_name: String,
  codes: String,
  code_date: Date,
  design : String,
  design_date : Date,
  design_approval : String,
  design_approval_date : Date,
  send_to_printer : String,
  send_to_printer_date : Date,
  proof_approval : String,
  proof_approval_date : Date,
  shipping : String,
  ship_Date : Date,
  received : String,
  received_Date : Date,
  completed : String,
  notes : String,
  printing : String,
  printing_Date : Date,
  stapling : String,
  stapling_Date : Date,
  user_id :{type: Number, required:true}
});

OrdersSchema.index({ sr_no: -1 });

const Orders = mongoose.model(
  'Orders',
  OrdersSchema
);

module.exports = Orders;
