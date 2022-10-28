const PostsService = require("../services/posts")

class PostsController {
    postsService = new PostsService();

    createPost = async(req,res,next) => {
        const { userId } = res.locals.user;
        // console.log(userId)
        const {title, option, amount, cost, item, content, origin, deadline} = req.body;
        await this.postsService.createPost(userId,title,option,amount,cost,item,content,origin,deadline);
        res.send("상품 생성 완료")
    }
    
    findAllProduct = async (req, res, next) => {
        const findAllPost = await this.postsService.findAllProduct();
        res.status(200).json({ data: findAllPost })
    }
    
    findOneProduct = async (req, res, next) => {
        const { postId } = req.params;
        const findOnePost = await this.postsService.findOneProduct(postId);
        res.status(200).json({data: findOnePost});
    }
    
    
}

module.exports = PostsController;