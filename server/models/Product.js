import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    slug: {
      type: String,
      require: true,
    },
    uniqueId: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    // during searching used this keyword filed we add all keywords in scentence related to that projecct
    keywords: {
      type: String,
      required: true,
    },
    image: [
      {
        url: {
          type: String,
          required: true,
        },
        index: {
          type: Number,
          required: true,
        },
      },
    ],

    // ✅ VARIANTS (ONLY SIZE DATA)
    variants: [
      {
        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL", "Free Size"],
          required: true,
        },
        price: Number,
        stock: Number,
      },
    ],
    // stock: {
    //   type: Number,
    //   required: true,
    // },
    // image: [
    //   {
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //     index: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    refund: {
      type: Number,
      default: 0,
    },
    refundReason: {
      type: String,
    },
    discount: {
      type: Number,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    insale: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
