const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/users", userController.findOne);

module.exports = router;
