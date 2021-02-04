const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const validateSession = require('../middleware/validate-session');

//USER SIGN UP
router.post('/signup', function(req, res) {
    User.create ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    })
    .then(
        function createSuccuess(user) {
            let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

//USER LOGIN

router.post('/login', function(req,res) {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign ({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})

                    res.status(200).json({
                        user: user,
                        message: "User successfully logged in!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ errors: 'Login Failed'});
                } 
            });
        } else {
            res.status(500).json({ error: 'User does not exist' })
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

// Update User 

router.put('/updateuser', validateSession, (req, res) => {

    User.update(
        { email: req.body.email, password: req.body.password},{where: { id: req.user.id}}
    ) .then ((user) => {
        res.status(200).json({
            Message: "User updated",
            User: user
        })
    }

    )

    .catch(err => res.status(500).json({ error: err }))
    
})

//Delete Account 

router.delete('/deleteuser', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "365d" });

                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        })
                    } else{
                        res.status(502).json({ error: 'password mismatch' });
                    }
                })

            } else {
                res.status(500).json({error: 'user not found'})
            }

        })
        .catch(err => res.status(500).json({error: 'error with database'}))
});

module.exports = router;