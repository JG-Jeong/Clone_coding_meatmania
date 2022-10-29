const UsersRepository = require("../repository/users"); 

class UserService {
  // 새 인스턴스 생성
  usersRepository = new UsersRepository();
  
  // 유저 정보 찾기위한 함수
  findUserAccount = async (email, nickname) => {
    // usersRepository안에 있는 finUserAccount 함수를 이용해서 선언
    const findUserAccountData = await this.usersRepository.findUserAccount(
      email,
      nickname
    );
    return findUserAccountData;
  };

  // 회원가입 찾기위한 함수
  signUp = async (email, nickname, password) => {
    // userRepository안에 있는 createAccount 함수를 이용하여 선언
    const createAccountData = await this.usersRepository.signUp(
      email,
      nickname,
      password
    );
    return {
      userId: createAccountData.userId,
      email: createAccountData.email,
      nickname: createAccountData.nickname,
      password: createAccountData.password,
    };
  };

  // 로그인 찾기위한 함수
  login = async (email, password) => {
    // userRepository안에 있는 login 함수를 이용하여 선언
    const loginData = await this.usersRepository.login(email, password);

    // 로그인이 없을때
    if (loginData === null) return loginData;
    return {
      userId: loginData.userId,
      nickname: loginData.nickname,
      email: loginData.email,
      password: loginData.password,
    };
  };

  // refreshToken 업데이트 하는 함수
  updateToken = async(email, refresh_token) => {
    // console.log(refresh_Token)
    await this.usersRepository.updateToken(email, refresh_token);
    const findData = await this.usersRepository.findUserAccount(email, refresh_token);

    return  {
      email: findData.email,
      refresh_token : findData.refresh_token
    };
  };
}

module.exports = UserService;