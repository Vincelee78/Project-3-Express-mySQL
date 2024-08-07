// 'use strict';

// var dbm;
// var type;
// var seed;

// /**
//   * We receive the dbmigrate dependency from dbmigrate initially.
//   * This enables us to not have to rely on NODE_PATH.
//   */
// exports.setup = function(options, seedLink) {
//   dbm = options.dbmigrate;
//   type = dbm.dataType;
//   seed = seedLink;
// };

// // exports.up = function(db) {
// //   return db.createTable('posters',{
// //       id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
// //       title: { type: 'string', length:100, notNull:false},
// //       cost: 'int',
// //       description:{ type: 'string', length:300, notNull:false},
// //       date: {type: 'date'},
// //       stock:'int',
// //       height: {type: 'int', comment:'in cm'},
// //       width:{type: 'int', comment:' in cm'},
      
// //   })
// // };

// exports.up = function(db) {
//   return db.createTable('wall_beds',{
//       id: { type: 'int', primaryKey:true, autoIncrement:true, unsigned: true},
//       name: { type: 'string', length:100, notNull:false},
//       weight: 'int',
//       description:{ type: 'string', length:1500, notNull:false},
//       stock:'int',
//       date: {type: 'date'},
//       cost: 'int',
      
      
//   })
// };

// exports.down = function(db) {
//   return db.dropTable('wall_beds');
// };

// exports._meta = {
//   "version": 1
// };

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

exports.up = function(knex) {
  return knex.schema.createTable('wall_beds', function(table) {
    table.increments('id').primary().unsigned();
    table.string('name', 100).nullable();
    table.integer('weight');
    table.string('description', 1500).nullable();
    table.integer('stock');
    table.date('date');
    table.integer('cost');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('wall_beds');
};

exports._meta = {
  "version": 1
};

