require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const refreshTokens = [];
// tạo token mới khi người dùng đăng nhập
const generateAccessToken = (user, isAdmin) => {
    return jwt.sign({
        id: user.id,
        isAdmin: isAdmin
    }, process.env.JWT_ACCESS_KEY, {
        // token hết hạn sau 30s
        expiresIn: '10m'
    })
}
// tạo token làm mới token
const generateRefreshToken = (user, isAdmin) => {
    return jwt.sign(
        {
            id: user.id,
            isAdmin: isAdmin
        },
        process.env.JWT_REFRESH_KEY,
        {expiresIn: "2d"}
    )
}
const login = async (req) => {
    let messError = [];
    if (!req.body.phone_number) {
        messError.push('Phone number is required');
    }
    if (!req.body.password) {
        messError.push('Password is required');
    }
    if (messError.length > 0) {
        return {
            statusCode: 400,
            message: messError,
            data: null
        }
    }
    let user = await User.findOne({phone_number: req.body.phone_number});
    if (!user) {
        return {
            statusCode: 400,
            message: 'User is not exist',
            data: null
        }
    }
    let checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
        return {
            statusCode: 400,
            message: 'Password is incorrect',
            data: null
        }
    }
    let isAdmin = user.role === 'admin';
    let {password, ...userWithoutPassword} = user.toObject();
    return {
        statusCode: 200,
        message: 'Login success',
        data: {
            user: userWithoutPassword,
            accessToken: generateAccessToken(user, isAdmin),
            refreshToken: generateRefreshToken(user, isAdmin)
        }
    }
}
const refreshToken = async (req) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return {
            statusCode: 400,
            message: "You're not authenticated!",
            data: null
        }
    }
    if (!refreshTokens.includes(refreshToken)) {
        return {
            statusCode: 403,
            message: "Refresh token is not valid!",
            data: null
        }
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            return {
                statusCode: 403,
                message: "Refresh token is not valid!",
                data: null
            }
        }
        const newAccessToken = generateAccessToken(user, user.isAdmin);
        const newRefreshToken = generateRefreshToken(user, user.isAdmin);
        refreshTokens.push(newRefreshToken);
        return {
            statusCode: 200,
            message: "Refresh token success!",
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        }
    })

}
module.exports = {
    login,
    refreshToken
}