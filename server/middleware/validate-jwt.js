const jwt = require("jsonwebtoken")
const { UserModel } = require("../models")
const validateSession = async (req, res, next) => { // here we are declaring a validateSession function. validateSession will create a session where a user is ALLOWED to make multiple requests (could be creating an item, or updating a profile) as long as they have a token authenticating this specific user's actions. Every action during the session (after authentication and a subsequent token attached to a user) will ALLOW access to private data or specific functions on a web application.
    if (req.method === 'OPTIONS') {
        return next();
    } else if (req.headers.authorization) { // For lines 6-23, this is where the token is created in order for a user to use specific functions and access private user data. There is a token for a registered user, but there is a different one after a user logs in. This second token creation allows the user to move through the website as they'd like to. Below is a ternary and basically means "If a user is found, a sessionToken is created and the user can navigate the website and access private user data. If a user is not found, they will not be authorized to access private user data."
        const { authorization } = req.headers;
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
        if (payload) {
            let foundUser = await UserModel.findOne({
                where: { id: payload.id }
            });
            if (foundUser) {
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({ message: "Not Authorized" });
            }
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
};
module.exports = validateSession;