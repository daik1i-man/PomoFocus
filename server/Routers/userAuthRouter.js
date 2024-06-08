const express =require("express");
const router = express.Router();
const userAuth = require("../Controllers/userAuthController.js");

router.post("/register", userAuth.register);
router.post("/login", userAuth.loginHandler);
router.put("/update/:id", userAuth.updateUser);
router.delete("/delete/:id", userAuth.deleteUser);

module.exports = router;

