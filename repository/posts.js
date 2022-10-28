const { Posts } = require("../models");

class PostsRepository {
    
    createProduct = async ( userId, title, option, amount, cost, item, content, origin, deadline) => {
        await Posts.create({userId,title,option,amount,cost,item,content,origin,deadline})
        return;
    }
    
    findAllProduct = async() => {
        const findAllProduct = await Posts.findAll();
        return findAllProduct;
    }
    
    findOneProduct = async(postId) => {
        const findOnePost = await Posts.findOne({where:{postId}});
        return findOnePost;
    }
    
}

module.exports = PostsRepository;