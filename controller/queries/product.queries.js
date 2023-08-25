class ProductQueries {

    #createProductTable = `CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        sgst INT NOT NULL,
        cgst INT NOT NULL,
        mrp INT NOT NULL,
        availableQuantity INT NOT NULL,
        unitWeight INT NOT NULL
    )`

    #insertProduct = `INSERT INTO product (name, type, price, sgst, cgst, mrp, availableQuantity, unitWeight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    #getAllProducts = `SELECT * FROM product`;

    get createProuctTable() {
        return this.#createProductTable;
    }

    get insertProduct() {
        return this.#insertProduct;
    }

    get getProductList() { 
        return this.#getAllProducts;
    }
}

const productQueries = new ProductQueries();
module.exports = productQueries;