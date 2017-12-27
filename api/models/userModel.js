var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  _userId: {
    type:Schema.Types.ObjectId
  },
  name:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type : String
  }
});


module.exports = mongoose.model('User', userSchema);
