const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
// const ReservController = require('../controllers/ReservController');

// Application Routes
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// API Routes
// router.get('/api/reserv', ReservController.minimumSecure);
/* GET sign in page. */
/**
* @swagger
* paths:
*  /api/user/{userId}:
*   get:
*     tags: [User API]
*     summary: User Info
*     parameters:
*       - name: userId
*         in: path
*         type: int
*         required: true
*         description: 유저 index값
*         example: 3
*     responses:
*       "200":
*         description: 유저 정보 출력 성공
*       "404":
*         description: 유저 값 없음
*/
router.get('/api/user/:id', UserController.CRUD.userInfo);

/**
* @swagger
* paths:
*  /api/user/create:
*   post:
*     tags: [User API]
*     summary: Insert User Account
*     requestBody:
*         description: 유저 생성 값
*         required: true
*         content:
*           application/x-www-form-urlencoded:
*               schema:
*                   type: object
*                   properties:
*                       userName:
*                           type: string
*                           example: "tester"
*                       userEmail:
*                           type: string
*                           example: "test@test.com"
*                       userPassword:
*                           type: string
*                           example: "test123#"
*                       agreePolicy:
*                           type: integer
*     responses:
*       "200":
*         description: 유저 계정 생성 성공
*       "404":
*         description: 유저 값 없음
*/
router.post('/api/user/create', UserController.CRUD.userCre);

/**
* @swagger
* paths:
*  /api/user/update:
*   put:
*     tags: [User API]
*     summary: Update User Password
*     requestBody:
*         description: 유저 pw
*         required: true
*         content:
*           application/x-www-form-urlencoded:
*               schema:
*                   type: object
*                   properties:
*                       oldPassword:
*                           type: string
*                           example: "test123#"
*                       newPassword:
*                           type: string
*                           example: "test213#"
*     responses:
*       "200":
*         description: 유저 비밀번호 변경 성공
*       "404":
*         description: 유저 값 없음
*/
router.put('/api/user/update', UserController.CRUD.userUpdt);

/**
* @swagger
* paths:
*  /api/user/delete/{userId}:
*   delete:
*     tags: [User API]
*     summary: Delete User
*     parameters:
*       - name: userId
*         in: path
*         type: int
*         required: true
*         description: 유저 index값
*     responses:
*       "200":
*         description: 유저 삭제 성공
*       "404":
*         description: 유저 값 없음
*/
router.delete('/api/user/delete/:id', UserController.CRUD.userDel);

module.exports = router;