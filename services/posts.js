const PostsRepository = require("../repository/posts");

class PostsService {
    postsRepository = new PostsRepository();

    createPost = async(userId,title,option,amount,cost,item,content,origin,deadline) => {
        await this.postsRepository.createPost(
            userId,title,option,amount,cost,item,content,origin,deadline
        )
        return;
    }
}

module.exports = PostsService;