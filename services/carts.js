const CartsRepository = require('../repository/carts');
const { Carts } = require("../models");

class CartsService {
    constructor() {
        this.cartsRepository = new CartsRepository;
    };
    
    //carts에 물건 생성 근데 이것만 하면 되는지 살짝 걱정되긴함 으음...
    createCarts = async ( postId, userId, option, amount, cost ) => {
        const carts = await this.cartsRepository.createCarts( postId, userId, option, amount, cost )
        
        return carts
    };
    
    
    //carts 조회
    getCarts = async ( uesrId ) => {
        const carts = await this.cartsRepository.getCarts({})  // 여기 좀 고민해 볼것. ()안에 {}를 쓸까 아니면 그냥 둘까 뭔 차이가 있을까?
        
        return carts;
    }
    
    //carts 삭제
    deleteCarts = async ( postId, userId ) => {
        const data = await this.cartsRepository.deleteCarts({
            where : { postId, userId }
        });
        return data;
    };
    
}
    
module.exports = CartsRepository;