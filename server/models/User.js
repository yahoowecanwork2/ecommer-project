import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: false,
        default:""
    },
    email: {
        type: String,
        default:"",
        required: false,
    },
    phoneno: {
        type: String,
        require: true,
        unique:true
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
            type: String,
            default:""
        },
        city: {
            type: String,
            default:""
        },
        pinCode: {
            type: String,
            default:""
        },
        state: {
            type: String,
            default:""
        },
    },
},
    {
        timestamps: true
    }
);


const User = mongoose.model("User", UserSchema);
export default User;