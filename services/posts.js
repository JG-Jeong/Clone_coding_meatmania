const PostsRepository = require("../repository/posts");

class PostsService {
    postsRepository = new PostsRepository();
    
    createProduct = async(userId,title,option,amount,cost,item,content,origin,deadline,imgUrl) => {
        await this.postsRepository.createProduct(
            userId,title,option,amount,cost,item,content,origin,deadline,imgUrl
        )
        return;
    }
    
    findAllProduct = async() => {
        const findAllProduct = await this.postsRepository.findAllProduct();
        return findAllProduct;
    }
    
    findOneProduct = async(postId) => {
        const findOnePost = await this.postsRepository.findOneProduct(postId);
        return findOnePost
    }

    updateProduct = async( amount,postId, userId) => {
        const updateProduct = await this.postsRepository.updateProduct(amount, postId, userId);
        return updateProduct
    }

    deleteProduct = async(postId) => {
        await this.postsRepository.deleteProduct(postId);
        return 
    }
}

module.exports = PostsService;