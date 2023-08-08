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

    generateJWTTokens() {
        console.log("**", process.env.ACCESS_TOKEN_SECRET_KEY)
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
}

module.exports = JWTFeatures;