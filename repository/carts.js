const { Carts } = require('../models');
const { Posts } = require('../models');
const { badRequestError } = require('../exception/exception')


class CartsRepository {

    //carts에 물건 생성
    createCarts = async ( postId, userId, title, amount, imgUrl ) => {
        //cart에 넣을 상품이 Posts 에 등록된 제품이 아닌경우 오류 반환
        try{
            //body로 받아온 postId로 Post에서 어떤 제품인지 찾는다.
            const findPosts = await Posts.findOne({
                where : {
                    postId
                },})
            console.log(findPosts)
            if(!findPosts) {
                throw new badRequestError; // 제품이 Post에 없는 제품이면 404 베드 리퀘스트 를 띄운다.
            }
            //카트에 이미 추가된 상품이면,
            const findCarts = await Carts.findOne({
                where : {
                    postId,
                    userId,
                    amount
                },})
            // 이미 추가된 상품에 amount를 더해준다.
            if (findCarts) {
                const updatedAmount = Number(findCarts.amount) + Number(amount) ;
                await Carts.update({ amount : updatedAmount }, {
                    where : {
                        postId,
                        userId,
                    },})
            }else {
                const option = findPosts.option;
                const cost = findPosts.cost;
                const carts = await Carts.create({ postId, userId, title, option, amount, cost, imgUrl })
                return carts;
            }
        }catch (error){
            console.error(error);
            throw (error)
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
    deleteCarts = async ( postId ) => {
        const data = await Carts.destroy({
            where : { postId }
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

    findImg = async (postId) => {
        const findImg = await Posts.findOne({where : {postId}})
        return findImg;
    }
}

module.exports = CartsRepository