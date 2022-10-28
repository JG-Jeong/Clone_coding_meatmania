'use strict';

const fs = require('fs'); //파일을 불러오고 읽어오기 위한 라이브러리
const path = require('path'); // 파일 경로를 지정해주기 위해서
const Sequelize = require('sequelize');
const process = require('process'); //env 접근하기위해서 사용
const basename = path.basename(__filename); //현재 basename __filename : 내장
const env = process.env.NODE_ENV || 'development'; // *배포 환경에 따라 달라짐*
const config = require('../config/config')[env];
const db = {}; //시퀄이나 유저 객체 모델링을 담기 위해 객체를 하나 만들어준것.

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
