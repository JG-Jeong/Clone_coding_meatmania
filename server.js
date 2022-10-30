const server = require("./app");
const port = process.env.Port
require("dotenv").config();
require("./socket");

server.listen(3000, () => {
  console.log("3000번 포트로 열렸습니다");
});