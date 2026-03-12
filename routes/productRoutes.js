import express from "express";
import upload from "../middlewares/upload.js";

const router = express.Router();
import { 
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productControllers.js";


router.post('/createproduct', upload.single("image"), createProduct);

router.get('/getallproduct', getAllProduct);
router.get('/getsingleproduct/:id', getSingleProduct);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);

export default router;
