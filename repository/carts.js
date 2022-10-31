const { Carts } = require('../models');
const { Posts } = require('../models');
const { badRequestError } = require('../exception/exception')


class CartsRepository {

    //carts에 물건 생성
    createCarts = async ( postId, userId, option, amount, cost ) => {
        //cart에 넣을 상품이 Posts 에 등록된 제품이 아닌경우 오류 반환
        try{
            const findPosts = await Posts.findOne({
                where : {
                    postId,
                },})
            if(!findPosts) {
                throw new badRequestError
            }
            //카트에 이미 추가된 상품이면,
            const findCarts = await Carts.findOne({
                where : {
                    postId,
                    userId,
                    option
                },})
            // 이미 추가된 상품에 amount를 더해준다.
            if (findCarts) {
                const updatedAmount = Number(findCarts.amount) + Number(amount) ;
                await Carts.update({ amount : updatedAmount }, {
                    where : {
                        postId,
                        userId,
                        option
                    },})
            }else {
                const carts = await Carts.create({ postId, userId, option, amount, cost })
                return carts;
            }
        }catch (error){
            console.error(error);
            return (error)
        }
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