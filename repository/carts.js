const { Carts } = require('../models');

class CartsRepository {

    //carts에 물건 생성
    createCarts = async ( postId, userId, option, amount, cost ) => {
        const carts = await Carts.create({ postId, userId, option, amount, cost })
        
        return carts;
    };

    //carts 조회
    getCarts = async ( userId ) => {
        const carts = await Carts.findAll({
            where : {userId}
        });
        return carts;
    }
    
    //cart 삭제
    deleteCarts = async ( postId, userId ) => {
        const data = await Carts.destroy({
            where : { postId, userId }
        });
        return data;
    }
}

module.exports = CartsRepository