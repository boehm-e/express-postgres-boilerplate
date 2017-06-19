let bookshelf = null;

const init = cb => {
    const conf =  require('./knexfile');
    const knex	= require('knex')(conf[process.env.NODE_ENV || "development"]);

    bookshelf = require('bookshelf')(knex);
    cb();
};

export default bookshelf;
export {init};
