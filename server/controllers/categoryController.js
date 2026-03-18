import { Category } from "../models/Category.js";
import { generateSlug } from "../utils/slugGenerate.js";

export const getCategoryNames = async (req, res) => {
  try {
    const categoriesNames = await Category.find().select("-image");
    return res.status(200).json({
      success: true,
      categoriesNames,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get categories names",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = generateSlug(name);
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
    // check required images
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum 41 images required",
      });
    }
    // map uploaded images
    const imageData = req.files.map((file, index) => ({
      url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      index: index,
    }));
    const category = await Category.create({
      name,
      image: imageData,
      slug,
    });
    return res.status(201).json({
      success: true,
      message: "Product category created successfully",
      category,
    });
  } catch (error) {
    // if error remove uploaded files
    if (req.files) {
      req.files.forEach((file) => {
        removeFiles(`uploads/${file.filename}`);
      });
    }
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get categories names",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = generateSlug(name);
    await Category.findByIdAndUpdate(
      req.params.categoryId,
      { name, slug },
      { new: true },
    );
    return res.status(201).json({
      success: true,
      message: "Product category updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
