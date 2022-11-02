const UsersRepository = require("../repository/users"); 
const crypto = require('crypto');
const CHECK_PASSWORD = /^[a-zA-Z0-9]{4,30}$/
const EMAIL_VALIDATION =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;

class UserService {
  // 새 인스턴스 생성
  usersRepository = new UsersRepository();
  
  // 회원가입 찾기위한 함수
  signUp = async (email, nickname, password, confirmPassword) => {
      // usersService 안에 있는 findUserAccount 함수를 이용해서 선언
      const isSameUser = await this.usersRepository.findUserAccount(email, nickname);

      // 유저 중복 검사
      if (isSameUser) {
        throw new Error("이미 가입된 이메일 혹은 닉네임이 존재합니다.")
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

      let salt = crypto.randomBytes(32).toString('base64')
      // 반복 횟수 한번 늘려보자
      let Password = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('base64')

      // userRepository안에 있는 createAccount 함수를 이용하여 선언 (salt도 넣어야함)
      const createAccountData = await this.usersRepository.signUp(
        email,
        nickname,
        Password,
        salt
      );

      return createAccountData;
  };

  // 로그인 찾기위한 함수
  login = async (email, password) => {
      // userRepository안에 있는 login 함수를 이용하여 선언
      const loginData = await this.usersRepository.login(email);
  
      let salt = loginData.salt
      let Password = crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('base64')

      if (!loginData.nickname || Password !== loginData.password) {
        throw new Error("닉네임 또는 패스워드를 확인해주세요.");
      }                   
  
      return {loginData}

  };

  // refreshToken 업데이트 하는 함수
  updateToken = async(email, refresh_token) => {
    // console.log(refresh_Token)
    await this.usersRepository.updateToken(email, refresh_token);
    
    const findData = await this.usersRepository.findUserAccount(email, refresh_token);

    return  findData;
  };

  // nickname 불러오기
  getNickname = async(email, password) => {
    const getNickname = await this.usersRepository.findUserAccount(email, password);
    return getNickname;
  }
}

module.exports = UserService;