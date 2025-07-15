const mongoose = require('mongoose');
const txnSchema = new mongoose.Schema({
  produce: { type: mongoose.Schema.Types.ObjectId, ref:'Produce', required:true },
  trader: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  amount: { type:Number, required:true },
  method: { type:String, enum:['MPESA','Cash','Other'], default:'Other' },
  reference: String,
  timestamp: { type:Date, default:Date.now }
}, { timestamps:true });
module.exports = mongoose.model('Transaction', txnSchema);