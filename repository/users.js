const { Users } = require("../models");
const { Op } = require("sequelize");

class UsersRepository { 
  constructor() {
    this.Users = Users;
  }
  
  // 유저 정보 조회 by 이메일과 닉네임을 위한 함수
  findUserAccount = async (email, nickname) => {

    // findOne로 email, nickname으로 이루어진 정보가 있는지 확인
    const findUserAccountData = await this.Users.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }],
      },
    });
    return findUserAccountData;
  };

  // 회원가입을 위한 함수
  createAccount = async (email, nickname, password) => {

    // create로 회원가입
    const createAccountData = await this.Users.create({
      email,
      nickname,
      password,
    });
    return createAccountData;
  };

  // 로그인을 위한 함수
  login = async (email, password) => {
    
    // findOne으로 email, password가 있는지 확인
    const loginData = await this.Users.findOne({ where: { email, password } });
    return loginData;
  };
}

module.exports = UsersRepository;