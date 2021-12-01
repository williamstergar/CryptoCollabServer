const db = require("../db")

const CollabModel = require("./collab")
const CommentModel = require("./comment")
const CryptoModel = require("./crypto")
const UserModel = require("./user")

UserModel.hasMany(CollabModel)
UserModel.hasMany(CryptoModel)
UserModel.hasMany(CommentModel)

CollabModel.belongsTo(UserModel)
CollabModel.hasMany(CommentModel)

CryptoModel.belongsTo(UserModel)
CryptoModel.hasMany(CommentModel)

CommentModel.belongsTo(CollabModel)
CommentModel.belongsTo(CryptoModel)

module.exports = {
    dbConnection: db,
    models: {
        CollabModel,
        CommentModel,
        CryptoModel,
        UserModel
    }
}