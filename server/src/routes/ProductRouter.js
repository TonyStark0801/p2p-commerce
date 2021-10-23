import express from "express";
import expressAsyncHandler from "express-async-handler";
import { products } from "../../data.js";
import Product from "../models/ProductModel.js";

const productRouter = express.Router();

productRouter.get(
    "/",
    expressAsyncHandler(async(req, res) => {
        const allProducts = await Product.find({});
        res.send(allProducts);
    })
);

productRouter.get(
    "/seed",
    expressAsyncHandler(async(req, res) => {
        //await Product.remove({});
        const createdProducts = await Product.insertMany(products);
        res.send({ createdProducts });
    })
);

productRouter.get(
    "/:id",
    expressAsyncHandler(async(req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send({ product });
        } else {
            res.status(404).send({ message: "Product Not Found" });
        }
    })
);

export default productRouter;