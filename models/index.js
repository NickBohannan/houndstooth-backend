const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/EricSite");

const Item = db.define("item", {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    wood: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Item