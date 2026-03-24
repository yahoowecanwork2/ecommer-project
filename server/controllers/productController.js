import { removeFiles } from "../middleware/uploadProducts.js";
import Product from "../models/Product.js";
import Products from "../models/Products.js";
import { generateProducttId } from "../utils/idGenerate.js";
import { generateSlug } from "../utils/slugGenerate.js";
import fs from "fs";
import path from "path";

export const userGetProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const products = await Product.find()
      .select(
        "name slug uniqueId description keywords stock image discount price available insale",
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,
      stock: product.stock,
      discount: product.discount,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};
export const usersGetProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const products = await Products.find()
      .select(
        "name slug uniqueId description keywords stock image discount price available insale",
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,
      stock: product.stock,
      discount: product.discount,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};

export const userGetProductsByCategoy = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const products = await Product.find({ category: req.params.categoryId })
      .select(
        "name slug uniqueId description keywords stock image discount price available insale",
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,
      stock: product.stock,
      discount: product.discount,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};

export const filterProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const product = await Product.findOne({
      keywords: { $regex: keyword, $options: "i" },
    }).select(
      "name slug uniqueId description keywords stock image discount price available insale",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,
      stock: product.stock,
      discount: product.discount,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    };

    return res.status(200).json({
      success: true,
      product: formattedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product",
    });
  }
};
// search by single name
export const filterProductByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const product = await Product.findOne({
      name: { $regex: name, $options: "i" },
    }).select(
      "name slug uniqueId description keywords stock image discount price available insale",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,
      stock: product.stock,
      discount: product.discount,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    };

    return res.status(200).json({
      success: true,
      product: formattedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

// product/:slug
//  get single product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).select(
      "-refund -refundReason",
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product by slug fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// --------------------------- admin --------------------------------

// export const createProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       keywords,
//       stock,
//       price,
//       discount,
//       available,
//       insale,
//     } = req.body;

//     // check required images
//     if (!req.files || req.files.length < 4) {
//       return res.status(400).json({
//         success: false,
//         message: "Minimum 4 images required",
//       });
//     }

//     // map uploaded images
//     const imageData = req.files.map((file, index) => ({
//       url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
//       index: index,
//     }));

//     const product = await Product.create({
//       name,
//       category,
//       slug: generateSlug(name),
//       uniqueId: generateProducttId(name),
//       description,
//       keywords,
//       stock,
//       price,
//       discount,
//       available,
//       insale,
//       image: imageData,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.log(error);

//     // if error remove uploaded files
//     if (req.files) {
//       req.files.forEach((file) => {
//         removeFiles(`uploads/${file.filename}`);
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error creating product",
//       error: error.message,
//     });
//   }
// };
export const createProducts = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      keywords,

      variants,
      available,
      discount,
      insale,
    } = req.body;
    const parsedVariants = JSON.parse(variants);
    if (!parsedVariants || parsedVariants.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Variants required" });

    if (!req.files || req.files.length !== parsedVariants.length)
      return res
        .status(400)
        .json({ success: false, message: "Each variant must have 1 image" });

    const updatedVariants = parsedVariants.map((v, i) => ({
      size: v.size,
      price: Number(v.price),
      stock: Number(v.stock),
      image: [
        {
          url: `${req.protocol}://${req.get("host")}/uploads/${req.files[i].filename}`,
          index: i, // ✅ FIX
        },
      ],
    }));

    const product = await Product.create({
      name,
      category,
      slug: generateSlug(name),
      uniqueId: generateProducttId(name),
      description,
      keywords,
      variants: updatedVariants,
      available,
      discount,
      insale,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    // if error remove uploaded files
    if (req.files) {
      req.files.forEach((file) => {
        removeFiles(`uploads/${file.filename}`);
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// get all Products
export const adminGetProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const products = await Product.find()
      .select("name slug uniqueId variants available insale createdAt")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const formattedProducts = products.map((product) => {
      // ✅ all variants
      const variants = product.variants || [];

      // ✅ total stock (all variants ka sum)
      const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

      // ✅ lowest price (best for UI)
      const prices = variants.map((v) => v.price || 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      // ✅ first image (first variant se)
      const firstImage =
        variants.length > 0 && variants[0].image && variants[0].image.length > 0
          ? variants[0].image[0].url
          : null;

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,

        // ✅ calculated fields
        stock: totalStock,
        price: minPrice,

        available: product.available,
        insale: product.insale,

        image: firstImage,
      };
    });

    // ✅ total count (pagination ke liye)
    const totalProducts = await Product.countDocuments();

    return res.status(200).json({
      success: true,
      totalProducts,
      currentCount: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Admin Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
      error: error.message,
    });
  }
};

export const adminGetProductsByKeyword = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }
    const products = await Product.find({
      keywords: { $regex: keyword, $options: "i" },
    })
      .select("name slug uniqueId stock image price available insale")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      stock: product.stock,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get products by keyword",
    });
  }
};
export const adminGetProductsByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }
    const sortDirection = -1;
    const startIndex = 0;
    const limit = 10;
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    })
      .select("name slug uniqueId stock image price available insale")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      stock: product.stock,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get products by name",
    });
  }
};

export const adminGetProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const sort = req.query.sort || "desc";

    const sortDirection = sort === "asc" ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const products = await Product.find({ category: categoryId })
      .select("name slug uniqueId stock image price available insale")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      stock: product.stock,
      price: product.price,
      available: product.available,
      insale: product.insale,
      image: product.image?.length > 0 ? product.image[0] : null,
    }));

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      // totalProducts: total,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get products by category",
    });
  }
};

export const adminGetSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const product = await Product.findById(productId)
      .populate("category", "name slug")
      .lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

// update product fileds (name,category,slug,description,keywords,ytlink,discount,price,remark,rating)

export const updateProductFields = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name,
      description,
      category,
      keywords,
      discount,
      price,
      remark,
      averageRating,
    } = req.body;
    const productFound = await Product.findById(productId);
    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const slug = name ? await generateSlug(name) : productFound.slug;
    const newImages =
      req.files?.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        index,
      })) || [];
    if (newImages.length > 0 && productFound.image?.length > 0) {
      productFound.image.forEach((img) => {
        const filePath = path.join(process.cwd(), img.url.replace("/", ""));
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      productFound.image = newImages;
    }
    productFound.name = name || productFound.name;
    productFound.slug = slug;
    productFound.description = description || productFound.description;
    productFound.category = category || productFound.category;
    productFound.keywords = keywords || productFound.keywords;
    productFound.discount = discount || productFound.discount;
    productFound.price = price || productFound.price;
    productFound.remark = remark || productFound.remark;
    productFound.averageRating = averageRating || productFound.averageRating;
    const updatedProduct = await productFound.save();
    return res.status(200).json({
      success: true,
      message: "Product fileds updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// update pictures
export const updateProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const { replacedImages } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No new images uploaded",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const parsedReplacedImages = JSON.parse(replacedImages);
    if (parsedReplacedImages.length !== req.files.length) {
      return res.status(400).json({
        success: false,
        message: "Images count mismatch",
      });
    }
    for (let i = 0; i < parsedReplacedImages.length; i++) {
      const { index, removedImageUrl } = parsedReplacedImages[i];
      const newFile = req.files[i];

      const imageIndex = parseInt(index);

      if (
        isNaN(imageIndex) ||
        imageIndex < 0 ||
        imageIndex >= product.image.length
      ) {
        continue;
      }

      // Remove old image
      if (removedImageUrl) {
        const oldImageName = removedImageUrl.split("/uploads/")[1];
        const oldImagePath = path.join("uploads", oldImageName);
        await rm(oldImagePath).catch(() => {});
      }
      const newImageUrl = `${req.protocol}://${req.get("host")}/uploads/${newFile.filename}`;
      product.image[imageIndex].url = newImageUrl;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Images updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    if (req.files) {
      for (let file of req.files) {
        await rm(path.join("uploads", file.filename)).catch(() => {});
      }
    }
    res.status(500).json({
      success: false,
      message: "Error updating images",
      error: error.message,
    });
  }
};

// update stocks availability in sale
export const updateProductStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock, available, insale } = req.body;

    const productFound = await Product.findById(productId);

    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    productFound.stock = stock || productFound.stock;
    productFound.available = available || productFound.available;
    productFound.insale = insale || productFound.insale;
    const updatedProduct = await productFound.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// update refund and refund reason
export const updateProductRefund = async (req, res) => {
  try {
    const { productId } = req.params;
    const { refundReason, refund } = req.body;
    const productFound = await Product.findById(productId);
    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    productFound.refundReason = refundReason || productFound.refundReason;
    productFound.refund = refund || productFound.refund;
    const updatedProduct = await productFound.save();
    return res.status(200).json({
      success: true,
      message: "Product refund fileds updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete images
    if (product.image && Array.isArray(product.image)) {
      product.image.forEach((img) => {
        if (img.url) {
          // Extract filename from URL
          const fileName = img.url.split("/uploads/")[1];

          if (fileName) {
            const imagePath = path.join("uploads", fileName);

            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }
        }
      });
    }

    // Delete product
    await Product.findByIdAndDelete(req.params.productId);

    return res.status(200).json({
      success: true,
      message: "Product and images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
};

export const productStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,

          totalProducts: { $sum: 1 },

          availableProducts: {
            $sum: {
              $cond: [{ $gt: ["$stock", 0] }, 1, 0],
            },
          },

          outOfStockProducts: {
            $sum: {
              $cond: [{ $eq: ["$stock", 0] }, 1, 0],
            },
          },
        },
      },
    ]);

    const result = stats[0] || {
      totalProducts: 0,
      availableProducts: 0,
      outOfStockProducts: 0,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product stats",
      error: error.message,
    });
  }
};
