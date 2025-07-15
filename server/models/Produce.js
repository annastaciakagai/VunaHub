const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref:'User', 
     required:true },

  type: { 
    type:String, 
    required:true, 
    enum: ['avocado', 'maize','banana', 'kales', 'spinach', 'carrots'], },

  quantity: { 
    amount:{type:Number,
    required:true}, 
    unit:{type:String,enum:['kg','bags','crates','litres','units'], 
    default:'kg'} },

  intent: { 
    type:String, 
    enum:['sell','buy'], 
    required:true },

  quality: { 
    type:String, 
    enum:['A','B','C','Unsorted'], 
    default:'Unsorted' },

  pricePerUnit: { 
    type:Number, 
    default:null },

  notes: { 
    type:String, 
    maxlength:200 },

  locationName: { 
    type:String, 
    default:null 
  },
  location: { 
    type:{type:String,
    enum:['Point'],
    default:'Point'}, 
    coordinates:{type:[Number], 
    default:undefined} },

  status: { 
    type:String, 
    enum:['available','collected','enRoute','delivered','sold'], 
    default:'available' },

  collectionEvent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref:'CollectionEvent', 
    default:null }
}, { timestamps:true });

produceSchema.index({ location:'2dsphere' });

module.exports = mongoose.model('Produce', produceSchema);