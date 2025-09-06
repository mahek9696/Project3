const { imageUploadUtil } = require("../../helpers/cloudinary");
const Products = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

// Add a new Products
const addProduct = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Validate required fields
    if (!title || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newlyCreatedProduct = new Products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Products.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//Edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Product ID from URL:", id);
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Products.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock =
      totalStock === "" ? 0 : totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
