require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization == null) {
    res.status(401).send({
      errorMessage: "로그인이 필요합니다.",
    });
    return;
  }

  const [tokenType, tokenValue] = authorization.split(" ");

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인이 필요합니다.",
    });
    return;
  }

  try {
    const myToken = verifyToken(tokenValue);

    if (myToken == "jwt expired") {

      // access token 만료
      const userInfo = jwt.decode(tokenValue, process.env.SECRET_KEY);

      const email = userInfo.email;

      let refresh_token;
      Users.findOne({ where: {email} }).then((u) => {
        refresh_token = u.refresh_token;
        const myRefreshToken = verifyToken(refresh_token);

        if (myRefreshToken == "jwt expired") {
          res.send({ errorMessage: "로그인이 필요합니다." });
        } else {
          const myNewToken = jwt.sign(
            { email: email },
            process.env.SECRET_KEY,
            {
              expiresIn: "15m",
            }
          );
          res.send({ message: "new access Token", myNewToken : `Bearer ${myNewToken}` });
        }
      });
    } else {
      const {email} = jwt.verify(tokenValue, process.env.SECRET_KEY);
      const user = await Users.findAll({where : {email}})
      res.locals.user = user[0].dataValues;
        next();
    }
  } catch (err) {
    res.send({ errorMessage: err + " : 로그인이 필요합니다." });
  }
};

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return error.message;
  }
}