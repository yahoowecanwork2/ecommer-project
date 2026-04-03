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
        "name slug uniqueId description keywords variants image discount insale createdAt",
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const total = await Product.countDocuments();

    const formattedProducts = products.map((product) => {
      const defaultVariant =
        product.variants?.find((v) => v.stock > 0) || product.variants?.[0];

      const totalStock = product.variants?.reduce(
        (acc, v) => acc + (v.stock || 0),
        0,
      );

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,
        description: product.description,
        keywords: product.keywords,

        price: defaultVariant?.price || 0,
        stock: totalStock,

        discount: product.discount,
        available: totalStock > 0,
        insale: product.insale,

        image: product.image?.length > 0 ? product.image[0].url : null,
      };
    });

    return res.status(200).json({
      success: true,
      totalProducts: total,
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
// export const usersGetProducts = async (req, res) => {
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 10;
//     const sortDirection = req.query.sort === "asc" ? 1 : -1;
//     const products = await Products.find()
//       .select(
//         "name slug uniqueId description keywords stock image discount price available insale",
//       )
//       .sort({ createdAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);
//     const formattedProducts = products.map((product) => ({
//       _id: product._id,
//       name: product.name,
//       slug: product.slug,
//       uniqueId: product.uniqueId,
//       description: product.description,
//       keywords: product.keywords,
//       stock: product.stock,
//       discount: product.discount,
//       price: product.price,
//       available: product.available,
//       insale: product.insale,
//       image: product.image?.length > 0 ? product.image[0] : null,
//     }));

//     return res.status(200).json({
//       success: true,
//       totalProducts: formattedProducts.length,
//       products: formattedProducts,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to get all products",
//     });
//   }
// };

export const userGetProductsByCategoy = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const products = await Product.find({
      category: req.params.categoryId,
    })
      .select(
        "name slug uniqueId description keywords variants image discount insale createdAt",
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const formattedProducts = products.map((product) => {
      // ✅ default variant (first one)
      const defaultVariant = product.variants?.[0];

      // ✅ total stock (sum of all variants)
      const totalStock = product.variants?.reduce(
        (acc, v) => acc + (v.stock || 0),
        0,
      );

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,
        description: product.description,
        keywords: product.keywords,

        // ✅ derived from variants
        price: defaultVariant?.price || 0,
        stock: totalStock,
        available: totalStock > 0,

        discount: product.discount,
        insale: product.insale,

        // ✅ first image
        image: product.image?.length > 0 ? product.image[0] : null,
      };
    });

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get category products",
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

    const products = await Product.find({
      keywords: { $regex: keyword, $options: "i" },
    }).select(
      "name slug uniqueId description keywords variants image discount insale createdAt",
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    const formattedProducts = products.map((product) => {
      // ✅ default variant
      const defaultVariant = product.variants?.[0];

      // ✅ total stock
      const totalStock = product.variants?.reduce(
        (acc, v) => acc + (v.stock || 0),
        0,
      );

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,
        description: product.description,
        keywords: product.keywords,

        // ✅ derived fields
        price: defaultVariant?.price || 0,
        stock: totalStock,
        available: totalStock > 0,

        discount: product.discount,
        insale: product.insale,

        // ✅ first image
        image: product.image?.length > 0 ? product.image[0] : null,
      };
    });

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to filter products",
    });
  }
};
export const filterProductByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    }).select(
      "name slug uniqueId description keywords variants image discount insale createdAt",
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    const formattedProducts = products.map((product) => {
      const defaultVariant = product.variants?.[0];

      const totalStock = product.variants?.reduce(
        (acc, v) => acc + (v.stock || 0),
        0,
      );

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,
        description: product.description,
        keywords: product.keywords,

        price: defaultVariant?.price || 0,
        stock: totalStock,
        available: totalStock > 0,

        discount: product.discount,
        insale: product.insale,

        image: product.image?.length > 0 ? product.image[0] : null,
      };
    });

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to filter products by name",
    });
  }
};

// product/:slug
//  get single product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).select(
      "name slug uniqueId description keywords variants image discount insale createdAt",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ default variant
    const defaultVariant = product.variants?.[0];

    // ✅ total stock
    const totalStock = product.variants?.reduce(
      (acc, v) => acc + (v.stock || 0),
      0,
    );

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      uniqueId: product.uniqueId,
      description: product.description,
      keywords: product.keywords,

      // ✅ IMPORTANT
      price: defaultVariant?.price || 0,
      stock: totalStock,
      available: totalStock > 0,

      discount: product.discount,
      insale: product.insale,

      image: product.image || [],

      variants: product.variants || [],
    };

    res.status(200).json({
      success: true,
      message: "Product by slug fetched successfully",
      product: formattedProduct,
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

// export const createProducts = async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       description,
//       keywords,
//       variants,
//       available,
//       discount,
//       insale,
//     } = req.body;

//     const parsedVariants = JSON.parse(variants);

//     if (!parsedVariants || parsedVariants.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Variants required",
//       });
//     }

//     // ✅ MULTIPLE IMAGES (GLOBAL)
//     const images = req.files.map((file, index) => ({
//       url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
//       index,
//     }));

//     const product = await Product.create({
//       name,
//       category,
//       slug: generateSlug(name),
//       uniqueId: generateProducttId(name),
//       description,
//       keywords,
//       variants: parsedVariants,
//       image: images,
//       available,
//       discount,
//       insale,
//     });

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.log(error);

//     if (req.files) {
//       req.files.forEach((file) => {
//         removeFiles(`uploads/${file.filename}`);
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error creating product",
//     });
//   }
// };

// subimage
export const createProducts = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      keywords,
      variants,
      discount,
      insale,
      imageGroups,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const parsedVariants = JSON.parse(variants);

    if (!parsedVariants || parsedVariants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Variants required",
      });
    }

    let parsedImages = [];

    try {
      parsedImages = JSON.parse(imageGroups);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid imageGroups format",
      });
    }

    if (!parsedImages || parsedImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    if (req.files && req.files.length > 0) {
      let fileIndex = 0;

      parsedImages = parsedImages.map((group, groupIndex) => {
        const mainFile = req.files[fileIndex++];
        const mainUrl = mainFile
          ? `${req.protocol}://${req.get("host")}/uploads/${mainFile.filename}`
          : group.main.url;

        const subImages = group.subImages.map((sub, subIndex) => {
          const subFile = req.files[fileIndex++];
          const subUrl = subFile
            ? `${req.protocol}://${req.get("host")}/uploads/${subFile.filename}`
            : sub.url;

          return {
            url: subUrl,
            index: subIndex,
          };
        });

        return {
          main: {
            url: mainUrl,
            index: groupIndex,
          },
          subImages,
        };
      });
    }

    const product = await Product.create({
      name,
      category,
      slug: generateSlug(name),
      uniqueId: generateProducttId(name),
      description,
      keywords,
      variants: parsedVariants,
      images: parsedImages,
      discount,
      insale,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);

    if (req.files) {
      req.files.forEach((file) => {
        removeFiles(`uploads/${file.filename}`);
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error creating product",
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
      .select("name slug uniqueId variants image available insale createdAt")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const formattedProducts = products.map((product) => {
      const variants = product.variants || [];

      // ✅ total stock (all variants ka sum)
      const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

      // ✅ min price
      const prices = variants.map((v) => v.price || 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      // ✅ FIXED: image now from product.image[]
      const firstImage =
        product.image && product.image.length > 0 ? product.image[0].url : null;

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,

        // ✅ calculated
        stock: totalStock,
        price: minPrice,

        available: product.available,
        insale: product.insale,

        image: firstImage,
      };
    });

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

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    })
      .select("name slug uniqueId variants image available insale createdAt")
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedProducts = products.map((product) => {
      const variants = product.variants || [];

      // ✅ total stock
      const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

      // ✅ min price
      const prices = variants.map((v) => v.price || 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      // ✅ correct image
      const firstImage =
        product.image && product.image.length > 0 ? product.image[0].url : null;

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,

        stock: totalStock,
        price: minPrice,

        available: product.available,
        insale: product.insale,

        image: firstImage,
      };
    });

    return res.status(200).json({
      success: true,
      totalProducts: formattedProducts.length,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Search Product Error:", error);

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
      .select("name slug uniqueId  image variants  available insale")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const formattedProducts = products.map((product) => {
      const variants = product.variants || [];

      // ✅ total stock
      const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

      // ✅ min price
      const prices = variants.map((v) => v.price || 0);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      // ✅ correct image
      const firstImage =
        product.image && product.image.length > 0 ? product.image[0].url : null;

      return {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        uniqueId: product.uniqueId,

        stock: totalStock,
        price: minPrice,

        available: product.available,
        insale: product.insale,

        image: firstImage,
      };
    });

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
      remark,
      averageRating,
      variants, // ✅ add this
    } = req.body;

    const productFound = await Product.findById(productId);

    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ slug update
    const slug = name ? generateSlug(name) : productFound.slug;

    // ✅ handle images
    let newImages = [];

    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file, index) => ({
        url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        index,
      }));

      // ❗ delete old images
      if (productFound.image && productFound.image.length > 0) {
        productFound.image.forEach((img) => {
          const filePath = path.join(
            process.cwd(),
            img.url.split("/uploads/")[1]
              ? `uploads/${img.url.split("/uploads/")[1]}`
              : "",
          );

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }

      productFound.image = newImages;
    }

    // ✅ update basic fields
    productFound.name = name || productFound.name;
    productFound.slug = slug;
    productFound.description = description || productFound.description;
    productFound.category = category || productFound.category;
    productFound.keywords = keywords || productFound.keywords;
    productFound.discount = discount || productFound.discount;
    productFound.remark = remark || productFound.remark;
    productFound.averageRating = averageRating || productFound.averageRating;

    // ✅ update variants (IMPORTANT)
    if (variants) {
      try {
        const parsedVariants = JSON.parse(variants);
        productFound.variants = parsedVariants;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid variants format",
        });
      }
    }

    const updatedProduct = await productFound.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully ✅",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

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
    const { variants, available, insale } = req.body;

    const productFound = await Product.findById(productId);

    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ UPDATE VARIANTS STOCK
    if (variants) {
      try {
        const parsedVariants = JSON.parse(variants);

        productFound.variants = parsedVariants;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid variants format",
        });
      }
    }

    // ✅ update flags
    if (available) productFound.available = available;
    if (insale) productFound.insale = insale;

    const updatedProduct = await productFound.save();

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully ✅",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE STOCK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
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
      // ✅ add totalStock field (sum of variants stock)
      {
        $addFields: {
          totalStock: {
            $sum: "$variants.stock",
          },
        },
      },

      // ✅ group stats
      {
        $group: {
          _id: null,

          totalProducts: { $sum: 1 },

          availableProducts: {
            $sum: {
              $cond: [{ $gt: ["$totalStock", 0] }, 1, 0],
            },
          },

          outOfStockProducts: {
            $sum: {
              $cond: [{ $eq: ["$totalStock", 0] }, 1, 0],
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

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("PRODUCT STATS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching product stats",
      error: error.message,
    });
  }
};
