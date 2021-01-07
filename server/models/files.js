const mongoose = require ('mongoose');

const FilesSchema = mongoose.Schema({
  sr_no :Number,
  customer_id: String,
  path:  String ,
});

FilesSchema.index({ sr_no: -1 });

const Files = mongoose.model(
  'Files',
  FilesSchema
);

module.exports = Files;
