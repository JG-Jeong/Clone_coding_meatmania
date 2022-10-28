const { Posts } = require("../models");

class PostsRepository {
    
    createProduct = async ( userId, title, option, amount, cost, item, content, origin, deadline,imgUrl) => {
        await Posts.create({userId,title,option,amount:1,cost,item,content,origin,deadline,imgUrl})
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

    deleteProduct = async(postId) => {
        await Posts.destroy({where:{postId}});
        return
    }    
}

module.exports = PostsRepository;