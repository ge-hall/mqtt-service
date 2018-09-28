// Update with your config settings.

require('dotenv').config();

module.exports = {

  development: {
    authentication_token: 'Password',//'authentication_token_123',
    client: 'postgresql',
    connection: process.env.DB_URL
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_dbknex',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
