const Sequelize = require('sequelize');
// const db = require('./index');
// import rps from "../models/RPS.js";

const db = new Sequelize("tandatangan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const { DataTypes } = Sequelize;

const signatures = db.define(
  "signature",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    document_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    signed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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

module.exports = signatures;