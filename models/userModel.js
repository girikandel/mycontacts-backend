const moongose = require('mongoose');

const userSchema = moongose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"],
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: [true, "This email is already taken"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
},
    {
        timestamps: true,
    }
);

module.exports = moongose.model("User", userSchema);