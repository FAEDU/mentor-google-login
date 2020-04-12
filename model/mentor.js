const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const mentor = mongoose.Schema({
  id:{type:String},
  name:{type:String},
  email:{type:String, unique:true},
  password:{type:String},
  salt:{type:String},
  location:{type:String, default: null},
  dergee:{type:String, default: null},
  contact_no:{type:Number, default: null},
  university:{type:String, default: null},
  major:{type:String, default: null},
  specialization:{type:String, default: null},
  service:{type:String, default: null},
  linked_profile:{type:String, default: null},
  profilepicture:{type:String},
  availabiltity:{type:String, default: null},
  bio:{type:String, default: null},
  hour_devote:{type:String, default: null},
  resume:{type:String, default: null},
  student_applied:[],
  student_applied_count: {type: Number, default: 0},
  date_added:{type: Date},
  token:{type:String, default: null},
  form_filled:{type: Boolean, default: false},
  verified:{type: Boolean, default: false},
}).plugin(validator);

module.exports = mongoose.model('Mentor', mentor, 'Mentors');
