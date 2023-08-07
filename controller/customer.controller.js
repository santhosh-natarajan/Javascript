const mysqlConnectionPool = require("../db");
const customerQueries = require("./queries/customer.quries");

class CustomerController {

    insertCustomerRecord(req, res) {
        this.#createCustomerTable();
        const customerRequestBody = req.body;
        mysqlConnectionPool.getConnection((err, connect) => {
            if (!err) {
                connect.query(customerQueries.insertCustomerQ, [customerRequestBody.name], (err, results) => {
                    connect.release();
                    if (!err) {
                        return res.json({ message: 'Customer created', data: results.insertId });
                    } else {
                        return res.json({ message: 'Customer not created', data: err });
                    }
                })
            } else {
                return res.json({ message: 'DB connection error', data: err });
            }
        })
    }

    #createCustomerTable() {
        mysqlConnectionPool.getConnection((err, connect) => {
            if (!err) {
                connect.query(customerQueries.createCustomerTableQ, (err, result) => {
                    if (!err) {
                        return;
                    }
                })
            }
        })
    }
}

const customerController = new CustomerController();

module.exports = customerController;

