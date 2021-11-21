const {DataTypes} = require("sequelize")
const db = require("../db")
const User = db.define("user", {
    // firstName: {
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    // },
    // lastName: {
    //     type: DataTypes.STRING(100),   // Is there anything needed here to make firstName, lastName, username work like the rest?
    //     allowNull: false,
    // },
    // username: {
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    // },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = User