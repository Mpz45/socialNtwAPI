const { Schema, model } = require("mongoose");
const opt = { toJSON: { virtuals: true, getters: true, id: false } };

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    // one to many relationship
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    // one to many relationship
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  opt
);
const User = model("User", userSchema);
// creates virtual to retrieve length of users friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;
