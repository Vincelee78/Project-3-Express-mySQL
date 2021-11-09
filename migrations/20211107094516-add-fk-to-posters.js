'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType; 
  seed = seedLink;
};

exports.up = function(db) {
  // should be media_property_id(must match the table name and be singular and add a _id behind) for the second argument to work
  return db.addColumn('posters', 'mediaProperty_id', {
    type: 'int',
    unsigned:true,
    notNull : true,
    foreignKey: {
        name: 'poster_mediaProperty_fk',
        table: 'media_properties',
        rules: {
            onDelete:'cascade',
            onUpdate:'restrict'
        },
        mapping: 'id'
    }
})

};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
