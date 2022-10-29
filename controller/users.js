const UsersService = require('../services/users'); 
const jwt = require("jsonwebtoken")
require("dotenv").config();
const CHECK_PASSWORD = /^[a-zA-Z0-9]{4,30}$/
const EMAIL_VALIDATION =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;

class UsersController {
  usersService = new UsersService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmPassword } = req.body;

      // usersService 안에 있는 findUserAccount 함수를 이용해서 선언
      const isSameUser = await this.usersService.findUserAccount(email, nickname);

      // 유저 중복 검사
      if (isSameUser) {
        throw new Error("이미 가입된 이메일이 존재합니다.")
      }

      //이메일 형식이 아닐 경우
      if(!EMAIL_VALIDATION.test(email)) {
        throw new Error("이메일 형식을 맞춰주세요")
      }

      // 비밀번호 최소치 안맞을 경우
      if(!CHECK_PASSWORD.test(password)) {
        throw new Error("비밀번호는 최소 4자리수를 넘겨주세요")
      }

      // 비밀번호와 비밀번호 확인이 안맞을 경우
      if (password !== confirmPassword) {                                    
        throw new Error("비밀번호와 확인 비밀번호가 일치하지 않습니다.")
      }
    
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