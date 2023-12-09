const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt');
const config = require('./../../config/config.js');


const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email });
        if (!user)
            return res.status('401').json({ error: "User not found" });
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({ error: "Email and password don't match." });
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie('t', token, { expire: new Date() + 9999 });
        config.userToken.push(token);
        return res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" });
    }
}

const signout = (req, res) => {
    for (let i = 0; i < config.userToken.length; i++) {
        if (config.userToken[i] == req.cookies.t) {
            config.userToken[i] = null;
        }
    };
    res.clearCookie("t");
    return res.status('200').json({
        message: "signed out"
    })
};
const requireSignin = expressjwt({ 
    secret: config.jwtSecret, 
    algorithms: ["HS256"],
userProperty: 'auth'
})

const hasAuthorization = 
    (req, res, next) => {
    let authorized = false;
    for (let i = 0; i < config.userToken.length; i++) {
        if (config.userToken[i] == req.cookies.t) {
            authorized = true;
        }
    };
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next();
}
;

module.exports = { signin, signout, requireSignin, hasAuthorization };