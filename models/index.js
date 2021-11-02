const bookshelf=require('../bookshelf')

const Product=bookshelf.model('Product',{
    tableName:'posters'
});

module.exports={ Product};