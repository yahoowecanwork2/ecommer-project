import mongoose from "mongoose";

const addItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //   store firt image
    imageurl: {
      type: String,
      required: false,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    items: [addItemsSchema],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderno: {
      type: String,
      required: true,
    },
    customername: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
    },
    emailid: {
      type: String,
      required: true,
    },
    shippingaddress: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    alternateno: {
      type: String,
    },
    calculatedamount: {
      type: String,
    },
    discount: {
      type: String,
    },
    // store amount after deduction
    ordertotal: {
      type: String,
    },
    delivereddate: {
      type: Date,
    },
    paymentType: {
      type: String,
      default: "cod",
      enum: ["online", "cod"],
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: function () {
        return this.paymentType === "online";
      },
    },
    paymentstatus: {
      type: String,
      default: "pending",
      enum: ["pending", "complete"],
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "processing",
        "dispatched",
        "intransit",
        "delivered",
        "canceled",
      ],
    },
    cancelStatus: {
      type: String,
      default: "no",
      enum: ["yes", "no"],
    },
    return: {
      type: String,
      default: "yes",
      enum: ["yes", "no"],
    },
    returnremark: {
      type: String,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
