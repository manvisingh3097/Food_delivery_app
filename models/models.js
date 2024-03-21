const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require('../database');
require("dotenv").config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: { ssl: true },
}); // Example for postgres

const Org = sequelize.define("org", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Item = sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Pricing = sequelize.define("pricing", {
  org_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_dis_in_km: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  km_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fix_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

async function init() {
  await Item.sync();
  await Org.sync();

  await Pricing.sync(); // force to create table if not exists
}
init();

module.exports.Pricing = Pricing;
module.exports.Item = Item;
module.exports.Org = Org;
