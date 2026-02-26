import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateUserToken.js";
import { Admin } from "../models/Admin.js";
import sendRegisterAndResendOtpMail, {
  loginAndresendOtpEmail,
  sendForgotMail
} from "../middleware/sendMail.js";
import { sendMailtoUser, sendVerifyUser } from "../middleware/notifyMail.js";

//-------------------------------------- owner apis ----------------------------------

// regester admin
export const adminRegister = async (req, res) => {
  try {
    const { name, email, phoneno, password } = req.body;
    // check user exists
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exist with this email.",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    // create the user
    const user = {
      name,
      email,
      phoneno,
      password: hashedpassword,
    };
    const otp = Math.floor(100000 +Math.random() * 1000000);

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
    await sendRegisterAndResendOtpMail(
      email,
      "Study material application",
      data,
    );
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
    const { name, email, phoneno, password } = req.body;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    // create the user
    const user = {
      name,
      email,
      phoneno,
      password: hashedpassword,
    };
    const otp = Math.floor(100000 +Math.random() * 1000000);

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
    await sendRegisterAndResendOtpMail(
      email,
      "Study material application",
      data,
    );
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


export const verifyAdmin = async (req, res) => {
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

    await Admin.create({
      name: verify.user.name,
      authenticated: true,
      phoneno: verify.user.phoneno,
      email: verify.user.email,
      password: verify.user.password,
    });

    await sendVerifyUser(verify.user.email, "Registered successfully", userId);
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
    const user = await Admin.findOne({ email });
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
    const user = await Admin.findOne({ email: decodedData.email });
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

// user and admin login same
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password)
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required.",
      });
    }
    const existUser = await Admin.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect user email",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const user = {
      name: existUser.name,
      email,
    };
    // ------------------- otp send process start --------------------
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
    await loginAndresendOtpEmail(email, "Study material application", data);
    res.status(201).json({
      success:true,
      status: "success",
      message: "Login Otp send to your mail successfully",
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
export const adminResendLoginVerifyOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await Admin.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        message: "Incorrect user email",
      });
    }
    // create the user
    const user = {
      name: existUser.name,
      email,
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
    await loginAndresendOtpEmail(email, "Study material application", data);
    res.status(201).json({
      success:true,
      status: "success",
      message: "Login Otp resend to your mail successfully",
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
    const email = verify.user.email;
    // find user and send user detail in token
    const user = await Admin.findOne({ email }).select(
      "name userId phoneno email photoUrl",
    );
    //  generate token function call
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
    const user = await Admin.findById(userId).select("-password");
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
    const userFound = await Admin.findById(req.id);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const updatedUser = await Admin.findByIdAndUpdate(
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
    const userFound = await Admin.findById(req.id);
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    rm(userFound.image);
    const updatedUser = await Admin.findByIdAndUpdate(
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

export const adminUpdateProfile = async (req, res) => {
  try {
    const { phoneno, alternateno, address } = req.body;
    const user = await Admin.findById(req.id);
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
