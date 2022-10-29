const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const CartsController =require("../controller/carts");
const cartsController = new CartsController();

//장바구니 생성
router.post("/", authMiddleware, cartsController.createCarts );
//장바구니 조회
router.get("/", authMiddleware, cartsController.getCarts );
//장바구니 삭제
router.delete("/", authMiddleware, cartsController.deleteCarts );
// 장바구니 수량 변경
router.patch("/", authMiddleware, cartsController.updateCarts );
//장바구니 결제 -> 이건 할거면 나중에 생각해볼것
//router.get("/", authMiddleware, cartsController.payment );

module.exports = router;
