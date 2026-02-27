// user login bu otp 
// not from email and password 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateUserToken.js";
import { sendForgotMail }  from "../middleware/sendMail.js";
import { sendMailtoUser} from "../middleware/notifyMail.js";
import User from "../models/User.js";



//-------------------------------------- user controlers ----------------------------------

// regester user via phone no 
export const userRegister = async (req, res) => {
  try {
    const {name,phoneno} = req.body;
    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this phone no go to login.",
      });
    }
    
    const user = {
      name,
      phoneno,
    };
   const otp = Math.floor(100000 + Math.random() * 900000);

    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      },
    );
    const data = {
      name,
      otp,
    };
//    send otp to phoen no  


    res.status(201).json({
      success:true,
      status: "success",
      message: "Otp send to your mail successfully",
      token: activationToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};


export const registerOtpResend = async (req, res) => {
  try {
    const { name,phoneno } = req.body;
    // create the user
    const user = {
      name,
      phoneno,
    };
       const otp = Math.floor(100000 + Math.random() * 900000);
    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      },
    );
    const data = {
      name,
      otp,
    };
    // send otp to phone no function 


    res.status(201).json({
      success:true,
      status: "success",
      message: "Otp send to your mail successfully",
      token: activationToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};


// verify user for register  and send token
export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    if (!verify)
      return res.status(400).json({
        message: "Otp Expired",
      });
    if (verify.otp !== Number(otp))
      return res.status(400).json({
        message: "Wrong OTP",
      });

    await User.create({
      name: verify.user.name,
      phoneno: verify.user.phoneno,
    });
    const phoneno = verify.user.phoneno;
      const user = await User.findOne({ phoneno }).select(
      "name phoneno email photoUrl",
    );
    //  generate token function call
    await generateToken(res, user, `Register Successfully ${user.name}`);
    // send notification on phone no user register succes fully 
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

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "No User with this email",
      });
    const token = jwt.sign({ email }, process.env.Forgot_Secret);
    const data = { name: user.name, email, token };
    await sendForgotMail("Study material", data);
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({
      success:true,
      status: "success",
      message: "Reset password send to your mail",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Send password reset link on email",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    console.log(req.query.token)
    const {token,password} = req.body
    const decodedData = jwt.verify(token, process.env.Forgot_Secret);
    const user = await User.findOne({ email: decodedData.email });
    if (!user)
      return res.status(404).json({
        message: "No user with this email",
      });

    if (user.resetPasswordExpire === null)
      return res.status(404).json({
        message: "Token Expired",
      });

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({
        success:false,
        message: "Token Expired",
      });
    }
    const newpassword = await bcrypt.hash(password, 10);
    user.password = newpassword;
    user.resetPasswordExpire = null;
    await user.save();
    res.json({
      success:true,
      message: "Password Reset" 
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

// user login
export const userLogin = async (req, res) => {
  try {
    const { phoneno} = req.body;
    if (!phoneno) {
      return res.status(400).json({
        success: false,
        message: "Phone no required.",
      });
    }
    const existUser = await User.findOne({phoneno});
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect user phoneno",
      });
    }
    
    const user = {
      name: existUser.name,
      phoneno,
    };
   const otp = Math.floor(100000 + Math.random() * 900000);
    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      },
    );
    const data = {
      name: existUser.name,
      otp,
    };
    // otp send to registered phone no  
    res.status(201).json({
      success:true,
      status: "success",
      message: `Login Otp send to your ${phoneno}  successfully`,
      token: activationToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

// login resend otp
export const userResendLoginVerifyOtp = async (req, res) => {
  try {
    const { phoneno } = req.body;
    const existUser = await User.findOne({phoneno});
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect user phoneno",
      });
    }
    // create the user
    const user = {
      name: existUser.name,
      phoneno,
    };
     const otp = Math.floor(100000 + Math.random() * 900000);
    const activationToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      },
    );
    const data = {
      name: existUser.name,
      otp,
    };
    // send mail to user registered phoe no  
    res.status(201).json({
      success:true,
      status: "success",
      message: "Login Otp resend to your phone no  successfully",
      token: activationToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to resend otp",
    });
  }
};


// verify login otp and generate token
export const verifyLoginUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    // console.log(typeof otp,activationToken);
    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    // console.log("Verify Otp "+ typeof verify.otp)
    if (!verify)
      return res.status(400).json({
        message: "Otp Expired",
      });
    if (verify.otp !== Number(otp))
      return res.status(400).json({
        message: "Wrong OTP",
      });
    const phoneno = verify.user.phoneno;
    const user = await User.findOne({ phoneno }).select(
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
