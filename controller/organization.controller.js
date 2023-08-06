const mysqlConnectionPool = require("../db");
const Organization = require("../models/Organization");
const orgQueries = require('../controller/queries/organization.queries');
const org = new Organization();

class OrganizationController {

    insertOrganization(req, res) {
        const reqBody = req.body;
        if (reqBody) {
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
            let test = this.#executeInsertOrgQuery(orgQueries.insertOrganizatonQ, createdOrgValues.org);
            console.log("**",test)
        } else {
            return;
        }
    }

    #executeCreateOrgQuery(query) {
        mysqlConnectionPool.query(query, (err, result) => {
            if (err) throw err
        })
    }

    #executeInsertOrgQuery(query, values) {
        mysqlConnectionPool.getConnection((err, connection) => {
            if (!err) {
                connection.query(query, values, (err, result) => {
                    connection.release();
                    if (!err) {
                        return  { message: 'Success', data: `${result.insertId}` };
                    } else {
                        return { message: 'Failed', error: err }
                    }
                })
            } else {
                return  { message: 'DB Connection Error!', error: err }
            }
        })
    }
}

const organizationController = new OrganizationController();

module.exports = organizationController;