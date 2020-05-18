var User = require('../models/User');
var UserInfo = require('../models/Userinfo');
var moment = require('moment');


exports.getUser = async function(req, res, next) {
    allUsers = [];
    await User.find({}).then((doc) => {
        // console.log(doc);
        if (doc) {
            doc.forEach(docc => {
                docc.res_day = moment(parseInt(docc.res_day)).format('MM-DD-YYYY');
            });
        }
        allUsers = doc;
    })
    return res.status(200).json(allUsers);
}

// delete the user
exports.deleteUser = async function(req, res, next) {
    let userId = req.body.userId;
    console.log(userId);
    let result = 0;
    try {
        await User.findByIdAndUpdate(userId, { state: 2 }, (err, res) => {
            if (err) {
                console.log(err);
                result = 0;
            } else {
                result = 1;
            }

        }).catch((e) => {
            result = 0;
            console.log(e);
        });
    } catch (e) {
        result = 0;
        console.log(e);
    }
    res.status(200).json({ result: result });

}


// recover the user
exports.recoverUser = async function(req, res, next) {
    let userId = req.body.userId;
    console.log(userId);
    let result = 0;
    try {
        await User.findByIdAndUpdate(userId, { state: 1 }, (err, res) => {
            if (err) {
                console.log(err);
                result = 0;
            } else {
                result = 1;
            }

        }).catch((e) => {
            result = 0;
            console.log(e);
        });
    } catch (e) {
        result = 0;
        console.log(e);
    }
    res.status(200).json({ result: result });

}

// get online uses
exports.getOnlineUser = async function(req, res, next) {
    let onlineUsers = await UserInfo.find({ currentState: 1 }).populate('userId');
    console.log(onlineUsers);
    let resOnline = [];
    let temp = [];
    onlineUsers.map(function(onlineUser) {
        console.log(onlineUser);
        temp.push({
            name: onlineUser.userId.name,
            pseduo: onlineUser.userId. pseduo,
            email: onlineUser.userId.email,
            state: onlineUser.userId.state
        })
    })
    resOnline = temp;
    console.log(resOnline);
    return res.status(200).json(resOnline);
}


// blocking the user
exports.blockUser = async function(req, res, next) {
    let userId = req.body.userId;
    console.log(userId);
    let result = 0;
    try {
        await User.findByIdAndUpdate(userId, { img_state: 0 }, (err, res) => {
            if (err) {
                console.log(err);
                result = 0;
            } else {
                result = 1;
            }

        }).catch((e) => {
            result = 0;
            console.log(e);
        });
    } catch (e) {
        result = 0;
        console.log(e);
    }
    res.status(200).json({ result: result });
}

// unblocking the user
exports.unblockUser = async function(req, res, next) {
    let userId = req.body.userId;
    console.log(userId);
    let result = 0;
    try {
        await User.findByIdAndUpdate(userId, { img_state: 1 }, (err, res) => {
            if (err) {
                console.log(err);
                result = 0;
            } else {
                result = 1;
            }

        }).catch((e) => {
            result = 0;
            console.log(e);
        });
    } catch (e) {
        result = 0;
        console.log(e);
    }
    res.status(200).json({ result: result });
}