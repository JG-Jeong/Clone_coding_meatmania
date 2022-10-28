const express = require('express');
const router = express.Router();

const UsersController = require('../controller/users');
const usersController = new UsersController();


// 회원가입
router.post('/signup', usersController.signUp);

// 로그인
router.post('/login', usersController.login);

module.exports = router;