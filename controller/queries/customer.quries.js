class CustomerQueries {
    #createCustomerTableQ = `CREATE TABLE IF NOT EXISTS customer(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )`;
    #insertCustomerQ = `INSERT INTO customer (name) VALUES (?)`;

    get createCustomerTableQ() {
        return this.#createCustomerTableQ;
    }

    get insertCustomerQ() {
        return this.#insertCustomerQ;
    }
}

const customerQueries = new CustomerQueries()
module.exports = customerQueries;