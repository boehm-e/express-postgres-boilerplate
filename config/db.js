const conf  = {
    development: {
        client: 'postgresql',
        connection: {
            host:'127.0.0.1',
            database: process.env.DB_NAME || 'seedup',
            user:     process.env.DB_USER || 'seedup',
            password: 'seedup'
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
            host:'127.0.0.1',
            database: process.env.DB_NAME || 'seedup',
            user:     process.env.DB_USER || 'postgresql',
            password: 'seedup'
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

const knex = require('knex')(conf[process.env.NODE_ENV || "development"]);
const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
