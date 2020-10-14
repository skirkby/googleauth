const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DB_ENV || 'testing';
const configuredKnex = knex(config[environment]);

module.exports = configuredKnex;