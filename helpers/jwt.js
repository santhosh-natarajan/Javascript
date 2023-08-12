const JWT = require('jsonwebtoken');
require('dotenv').config()

class JWTFeatures {

    #payload = { name: 'test' };
    #secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    #refershTokenSecret = process.env.REFRESH_TOKEN_SECRET_KEY;
    #jwtOptions = {
        audience: "billing.com",
        expiresIn: '1h',
        issuer: "billing.com"
    }

    #generateJWTTokens() {
        return new Promise((resolve, reject) => {
            JWT.sign(this.#payload, this.#secretKey, this.#jwtOptions, (err, Token) => {
                if (!err) {
                    resolve(Token);
                } else {
                    reject(err);
                }
            })
        })
    }


    async getJWTToken(req, res) {
        const accessToken = await this.#generateJWTTokens();
        const refershToken = await this.#generateRefershToken();
        return res.json({ accessToken, refershToken });
    }

    verifiyToken(req, res, next) {
        if (req.headers['authorization'] !== undefined) {
            const authToken = req.headers['authorization'];
            const bearerToken = authToken.split(' ');
            const accessToken = bearerToken[1];
            JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, result) => {
                if (err) {
                    res.json({ message: 'Failed', err: err })
                } else {
                    next();
                }
            })
        } else {
            res.json({ message: 'Authorzation header is missing!', })
        }
    }

    #generateRefershToken() {
        return new Promise((resolve, reject) => {
            JWT.sign(this.#payload, this.#refershTokenSecret, this.#jwtOptions, (err, refershToken) => {
                if (!err) {
                    resolve(refershToken);
                } else {
                    reject(err);
                }
            })
        })
    }

    async getAccessTokenUsingRefershToken(req, res) {
        const name = JWT.decode(req.body.refershToken).name;
        const accessToken = await this.#generateJWTTokens();
        const refershToken = await this.#generateRefershToken();
        return res.json({ accessToken, refershToken });
    }
}

module.exports = JWTFeatures;