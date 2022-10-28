const PostsService = require("../services/posts")

class PostsController {
    postsService = new PostsService();

    createPost = async(req,res,next) => {
        const {title, option, amount, cost, item, content, origin, deadline} = req.body;
        await this.postsService.createPost(title,option,amount,cost,item,content,origin,deadline);
        res.send("상품 생성 완료")
    }


}

module.exports = PostsController;