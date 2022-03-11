const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "Please the name is required"],
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true,
    },
    passwd: {
        type: String,
        required: [true, "The password is required"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        // emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
})

UserSchema.methods.toJSON = function () {
    const { __v, passwd, ...user } = this.toObject();
    return user;
}

module.exports = model("User", UserSchema, "User")