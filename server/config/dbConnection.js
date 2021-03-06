const path = require('path');
const Datastore = require('nedb');

const db = new Datastore({ 
    filename: path.join(process.cwd(), 'db/leaderboard'), 
    autoload: true
});

module.exports = db;