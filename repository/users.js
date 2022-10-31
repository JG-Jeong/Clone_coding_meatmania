const { Users } = require("../models");  
const { Op } = require("sequelize");

class UsersRepository { 

  // 회원가입을 위한 함수
  signUp = async (email, nickname, password, salt) => {

    // create로 회원가입
    const createAccountData = await Users.create({
      email,
      nickname,
      password,
      salt
    });
    return createAccountData;
  };

  // 유저 정보 조회 by 이메일과 닉네임을 위한 함수
  findUserAccount = async (email, nickname) => {

    // findOne로 email, nickname으로 이루어진 정보가 있는지 확인
    const findUserAccountData = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }],
      },
    });
    return findUserAccountData;
  };

  // 로그인을 위한 함수
  login = async (email) => {
    
    // findOne으로 email이 있는지 확인
    const loginData = await Users.findOne({ where: {email} });
    return loginData;
  };

  // refreshToken 업데이트 하는 함수
  updateToken = async (email, refresh_token) => {
    const updateTokenData = await Users.update({ refresh_token : refresh_token }, { where: { email : email } });
    return updateTokenData;
  }
}

module.exports = UsersRepository;