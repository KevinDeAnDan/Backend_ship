const userController = require("../controllers/userControllers");
const authenticateJWT = require("../middleware/auth");
const router = require("express").Router();

router.use(authenticateJWT.authenticateJWT);

//Get all user
router.get("/", userController.getAllUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
