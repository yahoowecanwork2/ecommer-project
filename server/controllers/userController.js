// user login bu otp
// not from email and password
import { generateToken } from "../utils/generateUserToken.js";
import { sendMailtoUser } from "../middleware/notifyMail.js";
import User from "../models/User.js";

//-------------------------------------- user controlers ----------------------------------
export const checkUserExist = async (req, res) => {
  try {
    const { phone } = req.body;
    const userExists = await User.findOne({ phoneno: phone });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this phone no. Go to login.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User does not exist. You can register.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to check user",
    });
  }
};

// verify user for register  and send token
export const registerUser = async (req, res) => {
  try {
    const { phone } = req.body;
    await User.create({
      name: "E-commerce Module user",
      phoneno: phone,
    });
    const user = await User.findOne({ phoneno: phone }).select(
      "name phoneno email photoUrl",
    );
    //  generate token function call
    await generateToken(res, user, `Register Successfully ${user.name}`);
    return res.status(200).json({
      success: true,
      message: "Registered successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify",
    });
  }
};

// verify login otp and generate token
export const loginUser = async (req, res) => {
  try {
    const { phone } = req.body;
    const phoneno = phone;
    const user = await User.findOne({ phoneno: phone }).select(
      "name phoneno email photoUrl",
    );
    await generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

// give user profile detail
export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const userFound = await User.findById(req.id);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.id,
      {
        photoUrl: `/uploads/${req?.file?.path}` || userFound.image,
      },
      { new: true },
    );
    res.json({
      success: true,
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add image in profile",
    });
  }
};

export const removeProfilePic = async (req, res) => {
  try {
    const userFound = await User.findById(req.id);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    rm(userFound.image);
    const updatedUser = await User.findByIdAndUpdate(
      req.id,
      {
        photoUrl: "",
      },
      { new: true },
    );
    res.json({
      success: true,
      message: "Profile image removed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove image",
    });
  }
};

export const userUpdateProfile = async (req, res) => {
  try {
    const { phoneno, alternateno, address } = req.body;
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const updateData = {};
    if (phoneno) {
      updateData.phoneno = phoneno;
    }
    if (alternateno) {
      updateData.alternateno = alternateno;
    }
    if (
      address &&
      typeof address === "object" &&
      Object.keys(address).length > 0
    ) {
      updateData.address = address;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.id,
      { $set: updateData },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating profile",
    });
  }
};

// send email message to particular user
export const sendEmailToUser = async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    if (!subject || !message || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "Subject and message are required.",
      });
    }
    await sendMailtoUser(email, subject, name, message);
    return res.status(200).json({
      success: true,
      message: `Emails sent successfully to user.`,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send emails.",
      error: error.message,
    });
  }
};

// get my cart
export const getMyCartItems = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const totalAmount = user.cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      return sum + price * item.quantity;
    }, 0);

    return res.status(200).json({
      success: true,
      count: user.cart.length,
      totalAmount,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
    });
  }
};

// get my cart
export const addItemToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, imageUrl, quantity, price, slug, name, description } =
      req.body;
    console.log(userId);
    console.log(req.body);
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingItem = user.cart.find(
      (item) => item.slug.toString() === slug,
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        productId,
        imageUrl,
        quantity,
        price,
        slug,
        name,
        description,
      });
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: existingItem
        ? "Cart item quantity updated"
        : "Item added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
};

// remove item to cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;
    console.log(req.body);
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cart: { productId: productId },
        },
      },
      { new: true },
    ).select("cart");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "productId and quantity are required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    if (quantity === 0) {
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        quantity === 0 ? "Item removed from cart" : "Cart quantity updated",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Update cart quantity error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
    });
  }
};

// clear cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true },
    ).select("cart");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};

// my wishlist
export const getMyWishlistItems = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      count: user.wishlist.length,
      cart: user.wishlist,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
    });
  }
};

// add itme to wishlist
export const addItemToWishlist = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, imageUrl, price, slug, name, description } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingItem = user.wishlist.find(
      (item) => item.productId.toString() === productId,
    );
    if (existingItem) {
      return res.status(200).json({
        success: true,
        message: "Item already in wishlist",
        wishlist: user.wishlist,
      });
    }
    user.wishlist.push({
      productId,
      imageUrl,
      price,
      slug,
      name,
      description,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Item added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add item to wishlist",
    });
  }
};

// remove item to wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;
    console.log(productId);
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          wishlist: { productId: productId },
        },
      },
      { new: true },
    ).select("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from wishlist",
    });
  }
};

// clear wihslist
export const clearWishlist = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { wishlist: [] } },
      { new: true },
    ).select("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "wishlist cleared successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
    });
  }
};

// admin apis
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const users = await User.find({})
      .select("-password -orders -wishlist -cart -address")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalPages = Math.ceil(totalUsers / limit);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get single user error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const getSingleUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "orders",
        options: { sort: { createdAt: -1 } },
      });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User with orders fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};

export const getUserCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const user = await User.findById(userId).select("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const subtotal = user.cart.reduce(
      (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart: user.cart,
      subtotal,
      totalItems: user.cart.length,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

export const getUserWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart: user.cart,
      totalItems: user.cart.length,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

export const SearchUser = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const user = await User.findOne({
      $or: [
        { email: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
        { phoneno: { $regex: q, $options: "i" } },
      ],
    }).select("_id name email phoneno").limit(10);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: error.message,
    });
  }
};
