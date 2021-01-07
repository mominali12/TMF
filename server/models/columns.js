const mongoose = require ('mongoose');

const ColumnsSchema = mongoose.Schema({
  sr_no :{type: Number, required:true},
  column_name: { type: String, required: true },
  show:  String ,
});

ColumnsSchema.index({ sr_no: -1 });

const Columns = mongoose.model(
  'Columns',
  ColumnsSchema
);

module.exports = Columns;
