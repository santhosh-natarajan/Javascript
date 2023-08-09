const JWT = require('jsonwebtoken');
require('dotenv').config()

class JWTFeatures {

    #payload = { name: 'test' };
    #secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
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
        const jwtData = await this.#generateJWTTokens();
        return res.json({ jwtData });
    }
}

module.exports = JWTFeatures;