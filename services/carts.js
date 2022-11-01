const CartsRepository = require('../repository/carts');
const { Carts } = require("../models");

class CartsService {
    constructor() {
        this.cartsRepository = new CartsRepository;
    };
    
    //carts에 물건 생성
    createCarts = async ( postId, userId, option, amount, cost ) => {
        const carts = await this.cartsRepository.createCarts( postId, userId, option, amount, cost )
        
        return carts;
    };
    
    //carts 조회
    getCarts = async ( userId ) => {
        const carts = await this.cartsRepository.getCarts( userId ) ;

        return carts;
    }
    
    //carts 삭제
    deleteCarts = async ( postId ) => {
        const data = await this.cartsRepository.deleteCarts( postId );
        
        return data;
    };
    
    //carts 단일 품목 수량(amount)변경
    updateCarts = async ( userId, postId, amount ) => {
        const indiCarts = await this.cartsRepository.updateCarts( userId, amount, postId )
        
        return indiCarts;
    }
    
}
    
module.exports = CartsService;