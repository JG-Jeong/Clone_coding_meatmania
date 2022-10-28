const CartsService = require('../services/carts');

class CartsController {
    constructor() {
        this.cartsService = new CartsService;
    }

    //carts에 물건 생성
    createCarts = async (req, res,next) => {
        try {
            const { postId, option, amount, cost } = req.body ;
            const { userId } = res.locals.user ;

            // body에서 입력받은 값으로 cart생성
            const createCartsData = await this.cartsService.createCarts( postId, userId, option, amount, cost);
            
            //createCartsData 를 결과값을 return
            return res.status(200).json({ createCartsData })

        }catch(error) {
            //error 를 return
            console.log(`${error.name} : ${error.message}`)
            return res.status(error.staus || 401).send({
                message : "입력정보를 확인해 주세요.",
                ErrorData : `${error.name} : ${error.message}`
            })
        };
    }

    //carts 조회
    getCarts = async (req, res, next) => {
        const { userId } = res.locals.user ;
        
        const data = await this.cartsService.getCarts({ userId });
        
        return res.send(200).json({data})
    }

    // carts 삭제
    deleteCarts = async (req, res, next) => {
        const { cartId } = req.body ; //이걸 바디로 받아와야 하나...?
        const { userId } = res.locals.user ;
        
        const deleteCarts = await this.cartsService.deleteCarts({ cartId,userId })
        res.status(200).json({ message : "carts deleted" })
    }
    
}


module.exports = CartsController;