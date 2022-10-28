const { Posts } = require("../models");

class PostsRepository {

    createPost = async (userId, title, option, amount, cost, item, content, origin, deadline) => {
        await Posts.create({userId,title,option,amount,cost,item,content,origin,deadline})
    }
}

module.exports = PostsRepository;