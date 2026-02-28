import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        require: true,
    },
    image: {
        type: String,     
        default:""
    },
    
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quotation ",
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quotation ",
        }
    ],
    address: {
        locality: {
            type: String
        },
        city: {
            type: String
        },
        pinCode: {
            type: String
        },
        state: {
            type: String
        },
    },
},
    {
        timestamps: true
    }
);


const User = mongoose.model("User", UserSchema);
export default User;