const CartsRepository = require('../repository/carts');

class CartsService {
    constructor() {
        this.cartsRepository = new CartsRepository;
    };
    
    //carts에 물건 생성 근데 이것만 하면 되는지 살짝 걱정되긴함 으음...
    createCarts = async ( { postId, userId, option, amount, cost } ) => {
        const carts = await this.cartsRepository.createCarts({ postId, userId, option, amount, cost })
        
        return carts
    };
    
    
    
    
    //carts 조회
    
    
    
    
    
    //carts 삭제
    
    
}
    
module.exports = CartsRepository;