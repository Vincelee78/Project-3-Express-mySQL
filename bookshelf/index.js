const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
    'host': process.env.DB_HOST,
    'ssl': {
      'rejectUnauthorized': false
    }

  }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;