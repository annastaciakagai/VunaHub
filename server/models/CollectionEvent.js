const mongoose =require('mongoose');
const eventSchema = new mongoose.Schema({
  produce: { type: mongoose.Schema.Types.ObjectId, ref:'Produce', required:true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  collectionPoint: { type: mongoose.Schema.Types.ObjectId, ref:'CollectionPoint', required:true },
  route: { type: mongoose.Schema.Types.ObjectId, ref:'Route', default:null },
  status: { type:String, enum:['collected','enRoute','delivered'], default:'collected' },
  collectedAt: { type:Date, default:Date.now },
  deliveredAt: Date,
  notes: String
}, { timestamps:true });
module.exports = mongoose.model('CollectionEvent', eventSchema);