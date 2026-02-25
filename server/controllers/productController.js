import Product from "../models/Product.js";
import { generateProducttId } from "../utils/idGenerate.js";
import { generateSlug } from "../utils/slugGenerate.js";



export const userGetProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const products = await Product.find()
      .select("-ytvideolink -review -remark -refund -stock -keywords -refundReason")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const productsLength = await Product.countDocuments();
    return res.status(200).json({
      products,
      productsLength,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};



// product/:slug
//  get single product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).select("-refund -refundReason");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
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
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      keywords,
      stock,
      discount,
      available,
      insale,
      price,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }
    const slug = await generateSlug(name);
    const uniqueId = generateProducttId(name)
    const images =
      req.files?.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        index,
      })) || [];

    const product = await Product.create({
      name,
      slug,
      uniqueId:uniqueId,
      description,
      discount,
      category,
      keywords,
      available,
      insale,
      stock,
      price,
      image: images,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};


// get all Products
export const getProducts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const products = await Product.find()
      .select("-refund -keywords -stock -refundReason")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const productsLength = await Product.countDocuments();
    return res.status(200).json({
      products,
      productsLength,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};




export const getProductsByKeyword = async (req, res) => {
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
      .select("name slug image")
      .lean();
    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
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




export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const products = await Product.find({ category: categoryId })
      .sort({ createdAt:-1 })
    return res.status(200).json({
      success: true,
      count: products.length,
      products
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
    const slug = name
      ? await generateSlug(name)
      : productFound.slug
    const newImages =
      req.files?.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        index,
      })) || [];
    if (newImages.length > 0 && productFound.image?.length > 0) {
      productFound.image.forEach((img) => {
        const filePath = path.join(
          process.cwd(),
          img.url.replace("/", "")
        );
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


// update stocks availability in sale
export const updateProductStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      stock,
      available,
      insale
    } = req.body;

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
    const {
      refundReason,
      refund
    } = req.body;
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
    await Product.findByIdAndDelete(req.params.productId);
    return res.status(200).json({
      success: true,
      message: "Product and all related data deleted successfully",
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
