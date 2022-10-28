const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const usersRouter = require("./users");
const cartsRouter = require("./carts");
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/carts", cartsRouter);

module.exports = router;
