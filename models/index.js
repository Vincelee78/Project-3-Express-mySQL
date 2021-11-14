const bookshelf=require('../bookshelf')

const ProductTable=bookshelf.model('Poster',{
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
        return this.hasMany('Poster');
    }
})

const Tag = bookshelf.model('Tag',{
    tableName: 'tags',
    products() {
        return this.belongsToMany('Poster')
    }
})

const User = bookshelf.model('User',{
    tableName: 'users'
})

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_items',
    posters() {
        return this.belongsTo('Poster', 'product_id' )
    }

})

module.exports={ ProductTable, MediaProperty, Tag, User, CartItem};