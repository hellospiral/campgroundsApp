var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String, 
    avatar: String,
    firstName: String,
    lastName: String,
    isAdmin: {type: Boolean, default: false },
    email: {type: String, unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);