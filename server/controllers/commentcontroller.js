const router = require("express").Router();
const { models } = require("../models");
let validateSession = require("../middleware/validate-jwt")

router.post("/comment", validateSession, async (req, res) => {

    const {content, collabId} = req.body.comment;

    try {
        await models.CommentModel.create({
            content: content,
            collabId: collabId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: "Comment created"
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        });
    };
});

module.exports = router;