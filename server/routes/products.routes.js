const express = require("express");
const prodCtrl = require("../controllers/products.controller.js");
const authCtrl = require("../controllers/auth.controller.js")
const router = express.Router();

router
    .route('/api/products')
    .post(
        // authCtrl.hasAuthorization,
        prodCtrl.create)
    .get(
        // authCtrl.hasAuthorization,
        prodCtrl.list)
    .put(
        // authCtrl.hasAuthorization,
        prodCtrl.updatePrice)
    .delete(
        // authCtrl.hasAuthorization,
        prodCtrl.remove);


module.exports = router;