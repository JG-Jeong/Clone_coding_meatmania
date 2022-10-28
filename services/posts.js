const PostsRepository = require("../repository/posts");

class PostsService {
    postsRepository = new PostsRepository();

    createProduct = async(userId,title,option,amount,cost,item,content,origin,deadline) => {
        await this.postsRepository.createProduct(
            userId,title,option,amount,cost,item,content,origin,deadline
        )
        return;
    }

    findAllProduct = async() => {
        const findAllPost = await this.postsRepository.findAllProduct();
        return findAllPost;
    }

    findOneProduct = async(postId) => {
        const findOnePost = await this.postsRepository.findOneProduct(postId);
        return findOnePost
    }
}

module.exports = PostsService;