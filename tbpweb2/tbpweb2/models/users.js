const Sequelize = require('sequelize');
// const db = require('./index');
// import rps from "../models/RPS.js";

const db = new Sequelize("tandatangan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const { DataTypes } = Sequelize;

const users = db.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sign_img: {
        type: DataTypes.STRING,
        allowNull: false
      },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = users;