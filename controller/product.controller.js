const mysqlConnectionPool = require('../db');
const Product = require('../models/Product');
const productQueries = require('./queries/product.queries');
const newProduct = new Product();

class ProductController {

    insertProduct(req, res) {
        const productCreateReq = req.body;
        if (productCreateReq.productName !== "" && productCreateReq.productType !== "" && productCreateReq.productPrice >= 0 && productCreateReq.availableQuantity >= 0 && productCreateReq.unitWeight >= 0) {
            const createdProduct = newProduct.createProduct(productCreateReq.productName, productCreateReq.productType, productCreateReq.productPrice, productCreateReq.availableQuantity, productCreateReq.unitWeight);
            this.#createProductTable();
            mysqlConnectionPool.getConnection((err, connect) => {
                if (!err) {
                    connect.query(productQueries.insertProduct,
                        [createdProduct.name, createdProduct.type, createdProduct.price, createdProduct.sgst, createdProduct.cgst, createdProduct.mrp, createdProduct.availableQuantity, createdProduct.unitWeight],
                        (err, result) => {
                            connect.release();
                            if (!err) {
                                return res.json({ message: "Product created!", data: result.insertId });
                            } else {
                                return res.json({ message: "Product not created!", data: err });
                            }
                        })
                } else {
                    return res.json({ message: "DB connection error!", data: err });
                }
            });
        } else {
            return res.json({ message: 'Mandatory fields mising!', data: err });
        }
    }

    #createProductTable() {
        mysqlConnectionPool.getConnection((err, connect) => {
            if (!err) {
                connect.query(productQueries.createProuctTable, (err, result) => {
                    if (!err) {
                        return;
                    } else {
                        return err;
                    }
                })
            } else {
                return err;
            }
        });
    }
}

const productController = new ProductController();

module.exports = productController;