const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const {checkIfAuthenticatedJWT} = require('../../middleware');

const jwt = require('jsonwebtoken');

const generateAccessToken = (user, secretKey, expiry) => {
    return jwt.sign({
        'username': user.username,
        'id': user.id,
        'email': user.email
    }, secretKey, {
        'expiresIn': expiry // 1000ms = 1000 milliseconds, 1h = 1 hour, 3d = 3 days, 4m = 4 minutes, 1y = 1 year
    })
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const { User } = require('../../models');

router.post('/login', async (req, res) => {
    let user = await User.where({
        'email': req.body.email
    }).fetch({
        require: false
    });

if (user && user.get('password') == getHashedPassword(req.body.password)) {
    let accessToken = generateAccessToken(user.toJSON(), process.env.TOKEN_SECRET, '1h');
    res.send({
        accessToken
    })
} else {
    res.send({
        'error':'Wrong email or password'
    })
}
})

router.get('/profile', checkIfAuthenticatedJWT, async(req,res)=>{
    res.json({
        'user': req.user
    })
})


module.exports = router;