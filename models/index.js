const bookshelf=require('../bookshelf')

const ProductTable=bookshelf.model('PosterModel',{
    tableName:'posters',
    mediaProperty() {
        return this.belongsTo( 'MediaProperty', 'mediaProperty_id')
    },
        tags() {
            return this.belongsToMany('Tag');
        }
    
});

const MediaProperty = bookshelf.model('MediaProperty',{
    tableName: 'media_properties',
    poster() {
        return this.hasMany('PosterModel');
    }
})

const Tag = bookshelf.model('Tag',{
    tableName: 'tags',
    products() {
        return this.belongsToMany('PosterModel')
    }
})


module.exports={ ProductTable, MediaProperty, Tag};