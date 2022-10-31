const PostsService = require("../services/posts")

class PostsController {
    postsService = new PostsService();

    createProduct = async(req,res,next) => {
        try{        
        const {title, option, amount, cost, item, content, origin, deadline, imgUrl} = req.body;
        await this.postsService.createProduct(title,option,amount,cost,item,content,origin,deadline,imgUrl);
        res.status(200).json({message:"상품 생성 완료"})
        }catch(e){
            res.status(400).json({message: e.message})
        }
    }
    
    findAllProduct = async (req, res, next) => {
        try{
        const findAllProduct = await this.postsService.findAllProduct();
        res.status(200).json({ data: findAllProduct })}
        catch(e){
            res.status(400).json({message:e.message})
        }
    }
    
    findOneProduct = async (req, res, next) => {
        try{
        const { postId } = req.params;
        const findOnePost = await this.postsService.findOneProduct(postId);
        res.status(200).json({data: findOnePost})}
        catch(e){
            res.status(400).json({message: e.message})
        }
    }

    // updateProduct = async (req, res, next) => {
    //     try{
    //     const { amount } = req.query;
    //     const { postId } = req.params;
    //     const { userId } = res.locals.user;
    //     const updateProduct = await this.postsService.updateProduct(amount, postId, userId);
    //     res.status(200).json({data : updateProduct})}
    //     catch(e){
    //         res.status(400).json({message: e.message})
    //     }
    // }



    deleteProduct = async (req, res,next) => {
        try{
        const { postId } = req.params;
        const deleteProduct = await this.postsService.deleteProduct(postId);
        res.status(200).json({data:deleteProduct})}
        catch(e){
            res.status(400).json({message: e.message})
        }
    }
    
    
}

module.exports = PostsController;