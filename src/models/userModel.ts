import mongoose,{Schema} from "mongoose";
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username can not be empty"],
    },
    password: {
        type: String,
        required: [true, "password can not be empty"],
    },
    email: {
        type: String,
        required: [true, "email can not be empty"],
        unique: true,
    }
},
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema);

export default User;