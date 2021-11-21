const {DataTypes} = require("sequelize")
const db = require("../db")
const Collab = db.define("collab", {
    collabName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collabDescription : {
          type: DataTypes.STRING(2000),
          allowNull: false,
      },
      owner_id: {
          type: DataTypes.INTEGER
      }
})

module.exports = Collab