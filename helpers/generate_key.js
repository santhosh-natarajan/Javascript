const crypto = require('crypto');

const accessTokenSecretKey = crypto.randomBytes(32).toString('hex');
const refershTokenSecretKey = crypto.randomBytes(32).toString('hex');

console.table({ accessTokenSecretKey, refershTokenSecretKey })