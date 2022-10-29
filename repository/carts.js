const { Carts } = require('../models');

class CartsRepository {

    //carts에 물건 생성
    createCarts = async ( postId, userId, option, amount, cost ) => {
        const carts = await Carts.create({ postId, userId, option, amount, cost })
        
        return carts;
    };

    //carts 조회
    getCarts = async (userId) => {
        
        const carts = await Carts.findAll({
            where:  {userId}
        });
        
        return carts;
    }
    
    //cart 삭제
    deleteCarts = async ( userId, postId ) => {
        const data = await Carts.destroy({
            where : { userId, postId }
        });
        return data;
    }
    
    //carts 단일 품목 수량(amount)변경
    updateCarts = async ( userId, postId, amount ) => {
        const indiCarts = await Carts.update(
            {amount},
            {where: { postId, userId }})
        return indiCarts
    }
}

module.exports = CartsRepository