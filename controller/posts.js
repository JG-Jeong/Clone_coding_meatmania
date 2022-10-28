const PostsService = require("../services/posts")

class PostsController {
    postsService = new PostsService();

    createProduct = async(req,res,next) => {
        const { userId } = res.locals.user;
        const {title, option, amount, cost, item, content, origin, deadline, imgUrl} = req.body;
        await this.postsService.createProduct(userId,title,option,amount,cost,item,content,origin,deadline,imgUrl);
        res.send("상품 생성 완료")
    }
    
    findAllProduct = async (req, res, next) => {
        const findAllProduct = await this.postsService.findAllProduct();
        res.status(200).json({ data: findAllProduct })
    }
    
    findOneProduct = async (req, res, next) => {
        const { postId } = req.params;
        const findOnePost = await this.postsService.findOneProduct(postId);
        res.status(200).json({data: findOnePost});
    }

    deleteProduct = async (req, res,next) => {
        const { postId } = req.params;
        const deleteProduct = await this.postsService.deleteProduct(postId);
        res.status(200).json({data:deleteProduct})
    }
    
    
}

module.exports = PostsController;