const express = require("express");
const router = express.Router();
const nhaDatController = require("../controller/NhaDatController");
const { uploadMultiple } = require("../middlewares/uploadCloudinary");
router.get("/search", nhaDatController.searchNhaDat);
router.get("/", nhaDatController.getAllNhaDat);
router.get("/:id", nhaDatController.getNhaDatById);
router.post("/addNhaDat", uploadMultiple, nhaDatController.addNhaDat);
router.put("/:id", uploadMultiple, nhaDatController.updateNhaDat);
router.delete("/:id", nhaDatController.deleteNhaDat);

module.exports = router;