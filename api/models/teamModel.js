'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamSchema = new Schema({
  _teamId: {
    type:Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: 'Kindly enter the name of the team'
  },
  logo:{
    type: String,
    default:"https://orig00.deviantart.net/d440/f/2017/212/9/b/mercy_sketch_by_rossdraws-dbicu75.jpg"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  elo:{
     type: Number, min: 0, max: 5000,
  },
  disp:{
    type: [{
      type : String,
      enum: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    }]
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'refused', 'active']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Team', TeamSchema);
