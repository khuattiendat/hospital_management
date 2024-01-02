const {login, refreshToken} = require("../services/authService");
const authController = {
    login: async (req, res) => {
        try {
            let user = await login(req);
            await res.cookie("refreshToken", user.data.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            });
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            });
        } catch (e) {
            res.send({
                statusCode: 400,
                message: e.message,
                data: null
            })
        }
    },
    refreshToken: async (req, res) => {
        try {
            let user = await refreshToken(req);
            res.cookie("refreshToken", user.data.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            res.status(user.statusCode).send({
                statusCode: user.statusCode,
                message: user.message,
                data: user.data
            });
        } catch (e) {
            res.send({
                statusCode: 400,
                message: e.message,
                data: null
            })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            res.send({
                statusCode: 200,
                message: "Logout success",
                data: null
            })
        } catch (e) {
            res.send({
                statusCode: 400,
                message: e.message,
                data: null
            })
        }
    }
}
module.exports = authController;