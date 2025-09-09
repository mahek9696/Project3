const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:email", fetchAllAddress);
router.delete("/delete/:email/:addressId", deleteAddress);
router.put("/update/:email/:addressId", editAddress);

module.exports = router;
