const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.router");
const usersRouter = require("./users.router");
const cartsRouter = require("./carts.router");
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/carts", cartsRouter);

module.exports = router;