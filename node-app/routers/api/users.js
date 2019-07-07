const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport')

const router = express.Router();

//引入数据模型
const User = require('../../models/User')

// router.get('/test', (req, res) => {

// });

//@route POST /api/users/register
//@desc 注册接口
//@access public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then((users) => {
        if (users) {
            return res.status(400).json('用户已存在')
        };
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar,
            identity: req.body.identity
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash
                newUser.save().then(() => { res.json(newUser) }).catch(error => error)
            });
        });

    })
});
//@route POST /api/users/login
//@desc 注册接口,返回token令牌
//@access public
router.post('/login', (req, res) => {
    const password = req.body.password;
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(404).json('用户不存在')
        };
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const rule = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, identity: user.identity }
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ success: true, token: "Bearer " + token })
                });
            } else {
                return res.status(400).json('密码错误')
            }

        })
    })
});
//@route GET /api/users/current
//@desc 通过token令牌，得到当前用户
//@access private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        })
        // res.json({ msg: "success" })
});


module.exports = router;