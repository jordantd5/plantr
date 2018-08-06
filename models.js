// const express = require('express');
// const app = express();
const pg = require('pg')
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', { operatorsAliases: false });
// db.connect();
// pg.connect();

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

plot.belongsTo(gardener, {through: 'gardener_plot'});
gardener.hasOne(plot, {through: 'gardener_plot'});

plot.belongsToMany(vegetable, {through: 'vegetable_plot'});
vegetable.belongsToMany(plot, {through: 'vegetable_plot'});

gardener.belongsTo(vegetable, {as: 'favorite_vegetable'})

vegetable.bulkCreate([
  {name: '', color: '', planted_on: ''},

])

module.exports = db;

