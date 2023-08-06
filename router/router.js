const express = require('express');
const router = express.Router();

const organizationController = require('../controller/organization.controller');


router.post('/organization/create', (req, res) => organizationController.insertOrganization(req, res));

module.exports = router;