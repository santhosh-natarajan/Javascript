const Organization = require("../models/Organization");
const org = new Organization();

class OrganizationController {

    createOrganization(req, res) {
        try {
            const reqBody = req.body;
            org.createOrganization(
                reqBody.name,
                reqBody.addressLine1,
                reqBody.addressLine2,
                reqBody.city,
                reqBody.pincode,
                reqBody.gstNumber,
                reqBody.phonenumber,
                reqBody.emailId
            )
            res.json({ message: 'success', data: org.getOrganizationDetails() });

        } catch (error) {
            res.json({ error: error });
        }
    }
}

const organizationController = new OrganizationController();

module.exports = organizationController;