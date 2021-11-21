const {DataTypes} = require("sequelize")
const db = require("../db")
const Crypto = db.define("crypto", {
    cryptoName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cryptoDescription : {
          type: DataTypes.STRING(2000),
          allowNull: false,
      },
      owner_id: {
          type: DataTypes.INTEGER
      }
})

module.exports = Crypto