import { ProductModel } from "../models/products.js";

// All api's for products 
// create Product api
const createProduct = async (req, res) => {
    try {
        const {name, price, category, stock } = req.body;
        const newProduct = new ProductModel({
            name,
            price,
            category,
            stock,
            image : req.file?req.file.filename : null
        })
        const saveproduct = await newProduct.save();
        res.status(201).json({
            success: true,
            saveproduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not created"
        });
    }
};

// get all Product api
const getAllProduct = async (req, res) => {
    try {
        const keyword = req.query.search ?
            {
                name: {
                    $regex: req.query.search,
                    $options: "i"
                }
            } :
            {};
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;

        const skip = (page - 1) * limit;
        const totalProduct = await ProductModel.countDocuments();
        const getAllproducts = await ProductModel.find(keyword).skip(skip).limit(limit).sort({ createdAt: -1 });

        res.status(200).json({
            totalProduct: totalProduct,
            getAllproducts,
            success: true,
            page,
            pages: Math.ceil(totalProduct / limit)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }

};

// get single Product api
const getSingleProduct = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        const getsingleproduct = await ProductModel.findById(id);
        if (!getsingleproduct) {
            return res.status(404).json({
                success: false,
                message: `Product not found with this ${id}`
            })
        }
        res.status(200).json({
            success: true,
            getsingleproduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found"
        })
    };
};

// update Product api
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = await ProductModel.findByIdAndUpdate(
            id, req.body, { new: true }
        );
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: `Product not found with this ${id}`
            })
        }
        res.status(200).json({
            success: true,
            updateProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }
};

// delete Product api
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await ProductModel.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({
                success: false,
                message: `Product not found with this ${id}`
            })
        }
        res.status(200).json({
            success: true,
            deleteProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product not found"
        })
    }
};

// search Product api
// filter Product api
// sorting Product api


export {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
