const mysqlConnectionPool = require("../db");
const Organization = require("../models/Organization");
const orgQueries = require('../controller/queries/organization.queries');
const org = new Organization();

class OrganizationController {

    insertOrganization(req, res) {
        const reqBody = req.body;
        if (reqBody.name !== "" && reqBody.addressLine1 !== "" && reqBody.addressLine2 !== "" && reqBody.city !== "" && reqBody.pincode !== ""
            && reqBody.gstNumber !== "" && reqBody.phonenumber !== "" && reqBody.emailId !== "") {
            let createdOrgValues = org.createOrganization(
                reqBody.name,
                reqBody.addressLine1,
                reqBody.addressLine2,
                reqBody.city,
                reqBody.pincode,
                reqBody.gstNumber,
                reqBody.phonenumber,
                reqBody.emailId
            );

            this.#executeCreateOrgQuery(orgQueries.createOrganizationQ);
            mysqlConnectionPool.getConnection((err, connection) => {
                if (!err) {
                    connection.query(orgQueries.insertOrganizatonQ, createdOrgValues.org, (err, result) => {
                        if (!err) {
                            return res.json({ message: 'Success', data: `${result.insertId}` })
                        } else {
                            return res.json({ message: 'Error!', data: err })
                        }
                    })
                } else {
                    return res.json({ message: 'Error!!', data: err })
                }
            })
        } else {
            return res.json({ message: 'Error!', data: `Mandatory fields are missing` });
        }
    }

    getOrganizationById(req, res) {
        mysqlConnectionPool.getConnection((err, connect) => {
            if (!err) {
                connect.query(orgQueries.organizationByIdQ, [req.params.id], (err, results) => {
                    if (!err) {
                        return res.json({ message: 'Success', data: results[0] })
                    } else {
                        return res.json({ message: 'Failed', data: err });
                    }
                })
            } else {
                return res.json({ message: 'Failed', data: err });
            }
        })
    }

    #executeCreateOrgQuery(query) {
        mysqlConnectionPool.query(query, (err, result) => {
            if (err) throw err
        })
    }
}

const organizationController = new OrganizationController();

module.exports = organizationController;