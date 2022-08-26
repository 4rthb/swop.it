import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        registration: {type: Date},
        products: {type: [mongoose.Schema.Types.ObjectId], default: undefined}
    }
)

const User = mongoose.Model('User', userSchema)
export default User;