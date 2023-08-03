const express = require('express');
const organizationController = require('../controller/organization.controller');
const router = express.Router();

router.post('/organization/create', (req, res) => organizationController.createOrganization(req, res));

module.exports = router;