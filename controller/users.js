const UsersService = require('../services/users'); 
const jwt = require("jsonwebtoken")
require("dotenv").config();


class UsersController {
  usersService = new UsersService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmPassword } = req.body;
    
      const createSign = await this.MemberService.signUpMember(
        email,
        nickname,
        password,
        confirmPassword
      );

      res.status(201).json({ data: createSign });
    } catch(err) {
      res.status(400).json("회원가입을 실패하였습니다.")
    }
  }

  //로그인
  login = async (req, res, next) => {
    const { email, password } = req.body;
    const createLoginData = await this.MemberService.loginMember(
      email,
      password
    );

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign( { email: email }, process.env.SECRET_KEY,
    { expiresIn: "1000000s" }
    );

    res.status(201).json({ token });
  }
}

module.exports = UsersController;