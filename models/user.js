"use strict";
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"),
{ Schema } = mongoose,
userSchema = new Schema(
{
  name: {
    first: {
      type: String, 
      trim: true
    },
    last: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
},
{
  timestamps: true
}
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

 //Adding a hashing pre hook
 //Add a pre hook to the user schema.
 /*userSchema.pre("save", function(next) {
   let user = this;
   //Hash the user’s password.
   bcrypt.hash(user.password, 10).then(hash => {
     user.password = hash;
     next();
   })
   .catch(error => {
     console.log(`Error in hashing password: ${error.message}`);
     next(error);
   });
 });
 //Add a function to compare hashed passwords.
 userSchema.methods.passwordComparison = function(inputPassword){
   let user = this;
   //Compare the user password with the stored password.
   return bcrypt.compare(inputPassword, user.password);
 };*/

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
