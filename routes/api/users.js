const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const {
    checkIfAuthenticatedJWT
} = require('../../middleware');
const jwt = require('jsonwebtoken');
const {
    User,
    BlacklistedToken
} = require('../../models/index');


const generateAccessToken = (user, secretKey, expiry) => {
    return jwt.sign({
        'username': user.username,
        'id': user.id,
        'email': user.email,
    }, secretKey, {
        expiresIn: expiry
    });
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.get('/register', (req, res) => {
        const registerForm = createRegistrationForm();
        res.send({
            form: registerForm.toHTML(bootstrapField)
        })
    }),

    router.post('/register', async (req, res) => {

        try {
            let {
                username,
                password,
                email,
                billing_address,
                shipping_address,
                phone
            } = req.body

            const user = new User({
                username: username,
                password: getHashedPassword(password),
                email: email,
                billing_address: billing_address,
                shipping_address: shipping_address,
                phone: phone,

            });

            await user.save();
            res.json(user.toJSON())

        } catch (error) {

            return ({

                error: "We have encountered an internal server error",
            });
        }
    })


router.post("/login", async (req, res) => {

    let user = await User.where({
        email: req.body.email,
    }).fetch({
        require: false,

    });

    if (user && user.get('password') == getHashedPassword(req.body.password)) {

        let accessToken = generateAccessToken(user.toJSON(), process.env.TOKEN_SECRET, '45m');
        let refreshToken = generateAccessToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, '2w');
        res.send({
            accessToken,
            refreshToken
        })

    } else {
        res.send({
            'error': 'Wrong email or password'
        })
    }
})


router.get('/profile', checkIfAuthenticatedJWT, async (req, res) => {
    const user = req.user;
    res.json(user);
})


router.post('/refresh', async function (req, res) {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.sendStatus(401);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            res.sendStatus(403);
        } else {

            // check if the token has been blacklisted
            let blacklistedToken = await BlacklistedToken.where({
                'token': refreshToken
            }).fetch({
                'require': false
            })

            if (blacklistedToken) {
                res.status(401);
                res.send({
                    'error': 'This token has been expired'
                })
            } else {
                let accessToken = generateAccessToken(user, process.env.TOKEN_SECRET, '15m');
                res.json({
                    accessToken
                })
            }
        }
    })
})

router.post('/logout', async function (req, res) {
    let refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        res.sendStatus(401);
    } else {

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {

            if (err) {
                res.sendStatus(403)
            } else {
                console.log("valid refresh token");
                const token = new BlacklistedToken();
                token.set('token', refreshToken);
                token.set('date_created', new Date());
                await token.save();
                res.json({
                    'message': "Logged out"
                })
            }
        })
    }
});



module.exports = router;