const express = require("express");
const router = express.Router();
const { loginAdmin, verifyAdmin } = require("../controllers/adminController");
const verifyAdminMiddleware = require("../middleware/verifyAdmin");

router.post("/login", loginAdmin);
router.get("/verify", verifyAdminMiddleware, verifyAdmin);

module.exports = router;
