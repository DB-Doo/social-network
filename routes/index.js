const router = require("express").Router();
const thoughtRoutes = require("./api/thoughtRoutes");
const userRoutes = require("./api/userRoutes");


router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;