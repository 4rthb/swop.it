import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        uid: {type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        adress: {type: String, required: true},
    }
)

const User = mongoose.Model('User', userSchema)
export default User;
