// user login bu otp 
// not from email and password 
import { generateToken } from "../utils/generateUserToken.js";
import { sendMailtoUser} from "../middleware/notifyMail.js";
import User from "../models/User.js";



//-------------------------------------- user controlers ----------------------------------
export const checkUserExist = async (req, res) => {
  try {
    const { phone } = req.body;
    const userExists = await User.findOne({ phoneno:phone})
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
    const {phone} = req.body;
    await User.create({
      name:"E-commerce Module user",
      phoneno:phone,
    });
      const user = await User.findOne({phoneno:phone}).select(
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
    const {phone } = req.body;
    const phoneno = phone;
    const user = await User.findOne({ phoneno:phone }).select(
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
