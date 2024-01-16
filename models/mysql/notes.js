const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");

const Notes = sequelize.define(
  "tracks",
  {
    tile: {
      type: DataTypes.STRING,
      allowNull:false,
    },

    noteContent: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.STRING,
    },
  
  },
);

module.exports = Notes;
