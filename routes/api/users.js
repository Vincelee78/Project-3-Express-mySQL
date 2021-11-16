const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const {checkIfAuthenticatedJWT} = require('../../middleware');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({
        'username': user.get('username'),
        'id': user.get('id'),
        'email': user.get('email')
    }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
    });
}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}



router.post("/login", async (req, res) => {
    
    let user = await User.where({
      email: req.body.email,
    }).fetch({
      require: false,

    });
    
    if (user && user.get('password') == getHashedPassword(req.body.password)) {
        let accessToken = generateAccessToken(user);
        res.send({
            accessToken
        })
    } else {
        res.send({
            'error':'Wrong email or password'
        })
    }
})
    //   const refreshToken = generateAccessToken(
    //     user,
    //     process.env.REFRESH_TOKEN_SECRET,
    //     "7d"
    //   );
//       res.json({
//         accessToken,
//         // refreshToken,
//         user: userObject,
//       });
//     } else {
//       res.send({
//         error: "Wrong email or password",
//       });
//     }
//   });

router.get('/profile', checkIfAuthenticatedJWT, async(req,res)=>{
    res.json({
        'user': req.user
    })
})


module.exports = router;