const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const PostsController =require("../controller/posts");
const postsController = new PostsController();

router.post("/", authMiddleware , postsController.createPost);
router.get("/", postsController.findAllProduct)
router.get("/:postId", postsController.findOneProduct)

module.exports = router;
