// const express = require('express');
// const app = express();
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', { logging: false,
// no more SQL in terminal
operatorsAliases: Sequelize.Op, });
// silence operator warning

// const { STRING, INTEGER, BOOLEAN, DATE } = Sequelize

const gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
})

const plot = db.define ('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN,
})

const vegetable = db.define ('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE,
})

plot.belongsTo(gardener);
gardener.hasOne(plot);

plot.belongsToMany(vegetable, {through: 'vegetable_plot'});
vegetable.belongsToMany(plot, {through: 'vegetable_plot'});

gardener.belongsTo(vegetable, {as: 'favorite_vegetable'})

module.exports = db;

