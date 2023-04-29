const mongoos = require("mongoose");

const userSchema = new mongoos.Schema({
  username: {
    type: String,
    require: [true, "user must have a user name"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "user must have a password"],
  },
});

const User = mongoos.model("User", userSchema);

module.exports = User;
