const bookshelf=require('../bookshelf')

const ProductTable=bookshelf.model('PosterModel',{
    tableName:'posters',
    mediaProperty() {
        return this.belongsTo('MediaProperty')
    }
});

const MediaProperty = bookshelf.model('MediaProperty',{
    tableName: 'media_properties',
    poster() {
        return this.hasMany('PosterModel');
    }
})



module.exports={ ProductTable, MediaProperty};