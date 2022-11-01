const { Posts } = require("../models");
const { Op } = require("sequelize");

class PostsRepository {
  createProduct = async (category, title,option,amount,cost,item,content,origin,deadline,imgUrl) => {
    await Posts.create({
      category,
      title,
      option,
      amount: 1,
      cost,
      item,
      content,
      origin,
      deadline,
      imgUrl,
    });
    return;
  };

  findAllProduct = async () => {
    const findAllProduct = await Posts.findAll();
    return findAllProduct;
  };

  findOneProduct = async (postId) => {
    const findOnePost = await Posts.findOne({ where: { postId } });
    return findOnePost;
  };

  // updateProduct = async (amount, postId, userId) => {
  //   const updateProduct = await Posts.update(
  //     { amount },
  //     { where: { [Op.and]: [{ userId }, { postId }] } }
  //   );
  //   return updateProduct;
  // };

  deleteProduct = async (postId) => {
    await Posts.destroy({ where: { postId } });
    return;
  };
}

module.exports = PostsRepository;
