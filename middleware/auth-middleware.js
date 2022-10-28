require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const {authorization} = req.headers
    // bearer와 token분리
    const [tokenType, tokenValue] = (authorization || "").split(" ");
    if ( tokenType !== 'Bearer') {
      res.status(401).send({
        errorMessage : '로그인 후 사용하세요',
    })
  }
    // 검증 ( userId만 필요)
    const {userId} = jwt.verify(tokenValue, process.env.SECRET_KEY);
    
    Users.findByPk(userId).then((user) => {
    // 익스프레스에서 locals라는 우리가 유틸리티 하게 사용할 수 있는 그런 공간을 제공
    res.locals.user = user;
    // **** 반드시 next 먼저 호출해야함 안그러면 미들웨어 레벨 예외처리 걸려서 그 뒤에있는 미들웨어는 연결 x
    next();
  });  
  } catch(err) {
    res.status(401).send({
      errorMessage : '로그인 후 사용하세요',
    })
    return;
  };

};
