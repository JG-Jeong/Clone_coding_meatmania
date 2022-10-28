const { Carts } = require('../models');

class CartsRepository {

    //carts에 물건 생성
    createCarts = async ({ postId, userId, option, amount, cost}) => {
        const carts = await Carts.create({ postId, userId, option, amount, cost })
        
        return carts;
    };


    //carts 조회
    findcarts


    //cart 삭제
    deleteCarts
    
    
    
}