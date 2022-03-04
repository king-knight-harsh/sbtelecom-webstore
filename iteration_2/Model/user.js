const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  name:  {
      type: String,
      required: true,
      maxLength:32,
      trim: true
  },
  lastname:  {
    type: String,
    maxLength:32,
    trim: true
},
email:{
    type:String,
    trim:true,
    required: true,
    unique: true
},
userinfo:{
    type:String,
    trim:true
},
//TODO: come back here
encry_password:{
    type: String,
    required: true
},
salt: String,
//Higher the number more privilegdes you have
role:{
    type: Number,
    defualt:0
},
purchases:{
    type: Array,
    default: []
}
},{timestamps: true});

userSchema.virtual("password")
        .set(function(password){
            this._password = password;
            this.salt = uuidv4();
            this.encry_password = this.securePassword(password);
        })
        .get(function(){
            return this._password;
        })

userSchema.method ={
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword){
        if(!passord) return "";
        try {
            return createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return"";
        }
    }
}
module.exports = mongoose.model("User",userSchema)