require("dotenv").config();
const router = require("express").Router();
const { models } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const models = require("../models");
// const validateSession = require('../middleware/validate-jwt')

router.post("/register", async (req, res) => {
    const { email, password } = req.body.user;
    try {
        let User = await models.UserModel.create({
            // firstName,
            // lastName,
            // username,
            email: email,
            password: bcrypt.hashSync(password, 13),
            admin: true
        });
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            SessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: `Failed to register user: ${err}`,
            });
        }
    }
});

router.get("/userinfo", async (req, res) => {
    try {
        await models.UserModel.findAll({
            include: [
                {
                    model: models.CollabModel,
                    model: models.CryptoModel,
                    include: [
                        {
                            model: models.CommentModel
                        }
                    ]
                }
            ]
        })
            .then(
                users => {
                    res.status(200).json({
                        users: users
                    })
                }
            )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        })
    }
})

router.post("/login", async (req, res) => { //works
    console.log(req.body.user)
    let { email, password } = req.body.user;
    try {
        let loginUser = await models.UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in",
                    SessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
            };
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router