const express = require("express");
const router = express.Router();
const nhaDatController = require("../controller/NhaDatController");

router.get("/", nhaDatController.getAllNhaDat);
router.get("/:id", nhaDatController.getNhaDatById);
router.post("/addNhaDat", nhaDatController.addNhaDat);
router.put("/:id", nhaDatController.updateNhaDat);
router.delete("/:id", nhaDatController.deleteNhaDat);
module.exports = router;