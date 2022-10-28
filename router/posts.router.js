const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const PostsController =require("../controller/posts");
const postsController = new PostsController();

router.post("/", postsController.createPost);
// router.get("/", authMiddleware)

module.exports = router;
