const express = require("express");
const app = express();
const routes = require("./router");
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SECRET_KEY));

const swaggerFile = require("./swagger-output");
const swaggerUi = require("swagger-ui-express");
// // const cors = require("cors");

// app.use(cors({
// origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
// }));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

app.use(express.json());
app.use("/", routes);
app.listen(3000, () => {
  console.log("3000번 포트로 열렸습니다");
});
