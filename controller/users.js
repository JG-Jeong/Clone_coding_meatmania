const UsersService = require('../services/users');  
const jwt = require("jsonwebtoken")
require("dotenv").config();

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmPassword } = req.body;
    
      await this.usersService.signUp(
        email,
        nickname,
        password,
        confirmPassword
      );

      res.status(201).json({ ok : true, statusCode : 201, message : "회원가입성공" });
    } catch(err) {
      res.status(412).json({ ok : 0 , statusCode : 412, err : err.message} )
    }
  }

  //로그인
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // 유효성 검사
      const login = await this.usersService.login(email, password);
      
      if (login === null)
      return res.status(404).send({ ok : 0, statusCode : 404, errorMessage: "가입 정보를 찾을 수 없습니다" });

      await this.usersService.login(
        email,
        password
      );


      // accesstoken 생성
      const accessToken = jwt.sign( { email: email }, process.env.SECRET_KEY, { expiresIn: "15m" });

      // refreshtoken 생성
      const refresh_token = jwt.sign( {}, process.env.SECRET_KEY,{ expiresIn: "1d" });

      // refreshtoken DB에 업데이트
      await this.usersService.updateToken(
        email,
        refresh_token
      );
  
      res.status(201).json({ accessToken : `Bearer ${accessToken}`, refresh_token : `Bearer ${refresh_token}` });
    } catch(err) {
      res.status(400).json({ok : 0, statusCode : 400, message : "로그인 실패"})
    }
  }
}

module.exports = UsersController;