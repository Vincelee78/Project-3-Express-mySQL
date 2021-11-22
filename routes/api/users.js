const express = require('express')
const router = express.Router();
const crypto = require('crypto');
const {checkIfAuthenticatedJWT} = require('../../middleware');
const { User } = require('../../models/index');
const jwt = require('jsonwebtoken');
// const {createRegistrationForm, bootstrapField, createLoginForm}=require('../forms/index');

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

router.get('/register',(req,res)=>{
    const registerForm=createRegistrationForm();
    res.send({
        form: registerForm.toHTML(bootstrapField)
    })
}),

router.post('/register', (req, res) => {
    const registerForm = createRegistrationForm();
    registerForm.handle(req, {
        success: async (form) => {
            const user = new User({
                'username': form.data.username,
                'password': getHashedPassword(form.data.password),
                'email': form.data.email
            });
            await user.save();
            req.flash("success_messages", "User signed up successfully!");
            res.redirect('/users/login')
        },
        'error': (form) => {
            res.send({
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

router.get('/users/login', (req,res)=>{
    const loginForm=createLoginForm();
    res.send({
        form: loginForm.toHTML(bootstrapField)
    })
})

router.post('/users/login', async (req, res) => {
    const loginForm = createLoginForm();
    loginForm.handle(req, {
        'success': async (form) => {
            // process the login

            // ...find the user by email
            let user = await User.where({
                'email': form.data.email
            }).fetch({
               require:false}
            );
            if (!user) {
                req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                res.redirect('/users/login')
            } else {
                    // check if the password matches
                    if (user.get('password') == getHashedPassword(form.data.password)) {
                        // add to the session that login succeed
                        // store the user details
                    req.session.user = {
                        id: user.get('id'),
                        username: user.get('username'),
                        email: user.get('email')
                    }
                    req.flash("success_messages", "Welcome back, " + user.get('username'));
                    res.redirect('/users/profile');
                } else {
                    req.flash("error_messages", "Sorry, the authentication details you provided does not work.")
                    res.redirect('/users/login')
                }
            }
        }, 'error': (form) => {
            req.flash("error_messages", "There are some problems logging you in. Please fill in the form again")
            res.send({
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

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

router.get('/users/profile', (req, res) => {
    const user = req.session.user;
    if (user==null) {
        req.flash('error_messages', 'You do not have permission to view this page');
        res.redirect('/users/login');
    } else {
        res.render({
            'user': req.user
        })
    }

})

router.get('/profile', checkIfAuthenticatedJWT, async(req,res)=>{
    res.json({
        'user': req.user
    })
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

router.get('/users/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_messages', "Goodbye");
    res.redirect('/users/login');
})


module.exports = router;