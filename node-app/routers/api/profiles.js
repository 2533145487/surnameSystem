const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const passport = require('passport');


// router.get('/test', (req, res) => {
//     res.json('wwww')
// });


// @route POST /api/profile/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profiles => {
        if (profiles) {
            res.json(profiles)
        } else {
            return res.status(404).json('添加信息失败')
        }
    })
});
// @route GET /api/profile
// @desc 返回全部信息
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(profiles => {
        if (profiles) {
            res.json(profiles)
        } else {
            return res.status(404).json('获取信息失败')
        }
    })
});
// @route GET /api/profile:id
// @desc 返回单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find({ _id: req.params.id }).then(profiles => {
        if (profiles) {
            res.json(profiles)
        } else {
            return res.status(404).json('获取信息失败')
        }
    })
});
// @route POST /api/profile/edit:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileFields }, { new: true }).then(profiles => {
        if (profiles) {
            res.json(profiles)
        } else {
            res.status(404).json('修改信息失败')
        }
    })
});
// @route GET /api/profile/delete:id
// @desc 删除信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id }).then(profiles => {
        if (profiles) {
            profiles.save().then(profile => res.json(profile))
        } else {
            return res.status(404).json('删除信息失败')
        }
    })

})






module.exports = router;