const CartsService = require('../services/carts');
const { Carts } = require("../models");
const PostsService = require('../services/posts')

class CartsController {
    constructor() {
        this.cartsService = new CartsService;
    }

    //carts에 물건 생성
    createCarts = async (req, res, next) => {
        try {
            const { postId, amount, } = req.body ;
            const { userId } = res.locals.user ;
            if ( !postId || !amount ) {
                throw new Error("입력값을 확인해 주세요");
            }

            const imgUrl = await this.cartsService.findImg(postId)
            
            // body에서 입력받은 값으로 cart생성
            const createCartsData = await this.cartsService.createCarts( postId, userId, postId.title, amount, imgUrl.imgUrl);
            
            //createCartsData 를 결과값을 return
            return res.status(200).json({ createCartsData })

        }catch(error) {
            //error 를 return
            console.log(`${error.name} : ${error.message}`)
            return res.status(error.staus || 401).send({
                ErrorData : `${error.name} : ${error.message}`
            })
        };
    }

    //carts 조회
    getCarts = async (req, res, next) => {
        const { userId } = res.locals.user ;
        const data = await this.cartsService.getCarts(userId);
        console.log(data)
        return res.status(200).json({ data })
    }

    // carts 삭제
    deleteCarts = async (req, res, next) => {
        const { postId } = req.body ;
        // const { userId } = res.locals.user ;
        
        const deleteCarts = await this.cartsService.deleteCarts( postId );
         res.status(200).json({ message : "carts deleted" });
    }
    
    //carts 단일 품목 수량(amount)변경
    updateCarts = async ( req, res, next ) => {
        const { amount, postId } = req.body;
        const { userId } = res.locals.user;
        
        const indiCarts = await this.cartsService.updateCarts( userId, amount, postId )
        res.status(200).json({ message : "carts updated" });
    }
    
}


module.exports = CartsController;