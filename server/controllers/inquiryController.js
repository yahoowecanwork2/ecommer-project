import Inquiry from "../models/inquiary.js";
import { sendInquiryNotificationToAdmin } from "../middleware/sendMail.js";

// ===============================
// CREATE INQUIRY
// ===============================
export const createInquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      productName,
      productId,
    } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      productName: productName || "",
      productId: productId || null,
    });

    // Send Mail
    try {
      await sendInquiryNotificationToAdmin(inquiry);
    } catch (mailError) {
      console.error("Mail Error:", mailError);
    }

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Create Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// GET ALL INQUIRIES
// ===============================
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("productId", "title price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Get All Inquiries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// FILTER BY STATUS
// ===============================
export const filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatus = [
      "new",
      "in progress",
      "resolved",
      "closed",
      "spam",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const inquiries = await Inquiry.find({ status })
      .populate("productId", "title price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Filter Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// UPDATE INQUIRY STATUS
// ===============================
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, statusNote } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatus = [
      "new",
      "in progress",
      "resolved",
      "closed",
      "spam",
    ];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    inquiry.status = status;

    if (statusNote !== undefined) {
      inquiry.statusNote = statusNote;
    }

    inquiry.isRead = true;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Update Inquiry Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// GET SINGLE INQUIRY
// ===============================
export const getSingleInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate(
      "productId",
      "title price images"
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    inquiry.isRead = true;
    await inquiry.save();

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Get Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// DELETE INQUIRY
// ===============================
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};