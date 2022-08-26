import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        images: {type: [mongoose.Schema.Types.ObjectId], default: undefined},
        publication: {type: Date},
        owner: {type: mongoose.Schema.Types.ObjectId, required: true},
        description: {type: String, required: true},
        expected: {type: String, required: true},
    }
)

const Product = mongoose.Model('Product', productSchema)
export default Product;