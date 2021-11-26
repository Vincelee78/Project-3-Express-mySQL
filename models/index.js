const bookshelf=require('../bookshelf')

const ProductTable=bookshelf.model('Wallbed',{
    tableName:'wall_beds',
    bedSize() {
        return this.belongsTo( 'BedSize', 'bed_size_id')
    },
    bedOrientation() {
        return this.belongsTo( 'BedOrientation', 'bed_orientation_id')
    },
    mattressType() {
        return this.belongsTo( 'MattressType', 'mattress_type_id')
    },
    frameColour() {
        return this.belongsTo( 'FrameColour', 'frame_colour_id')
    },
    // user(){
    //     return this.belongsTo( 'User', 'user_id')
    // },

     woodColour() {
        return this.belongsToMany('WoodColour');
     },

     order() {
        return this.belongsToMany('Order');
     },
    
     orderItem(){
         return this.belongsToMany('OrderItem')
     }
    
});

const BedSize = bookshelf.model('BedSize',{
    tableName: 'bed_sizes',
    wallBed() {
        return this.hasMany('Wallbed');
    }
})

const BedOrientation = bookshelf.model('BedOrientation',{
    tableName: 'bed_orientations',
    wallBed() {
        return this.hasMany('Wallbed');
    }
})

const MattressType = bookshelf.model('MattressType',{
    tableName: 'mattress_types',
    wallBed() {
        return this.hasMany('Wallbed');
    }
})
const FrameColour = bookshelf.model('FrameColour',{
    tableName: 'frame_colours',
    wallBed() {
        return this.hasMany('Wallbed');
    }
})

const User = bookshelf.model('User',{
    tableName: 'users',
    wallBed() {
        return this.hasMany('Wallbed')
    },
    order(){
        return this.hasMany('Order')
    }
})

const WoodColour = bookshelf.model('WoodColour',{
    tableName: 'wood_colours',
    wallBed() {
        return this.belongsToMany('Wallbed')
    }
})

const OrderItem =bookshelf.model('OrderItem',{
    tableName:'orders_items',
    wallBed() {
        return this.belongsToMany('Wallbed')
    }
})


const Order = bookshelf.model('Order',{
    tableName: 'orders',
    wallBed() {
        return this.belongsToMany('Wallbed')
    },
    wallBedUser() {
        return this.belongsTo('User', 'user_id' )
    }
})

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_items',
    wallBed() {
        return this.belongsTo('Wallbed', 'wall_bed_id' )
    }

})

// const Order = bookshelf.model('Order', {
//     tableName: 'orders',
//     wallBed() {
//         return this.belongsTo('User', 'user_id' )
//     }

// })

const Admin = bookshelf.model('Admin',{
    tableName: 'admin'
})

const AdminLogin = bookshelf.model('AdminLogin', {
    tableName: 'beds_admin',
    wallBed() {
        return this.belongsTo('Wallbed', 'wall_bed_id' )
    }
})

const BlacklistedToken = bookshelf.model('BlacklistedToken',{
    tableName: 'blacklisted_tokens'
})

const WoodColourWallBed = bookshelf.model('WoodColourWallBed',{
    tableName:'wall_beds_wood_colours',
    wallBed() {
        return this.belongsTo('Wallbed')
    },
    woodColour () {
        return this.belongsTo('WoodColour')
    }
})

module.exports={WoodColourWallBed,  ProductTable, BedSize, BedOrientation, MattressType,FrameColour, WoodColour, User, CartItem, Order, OrderItem ,Admin, AdminLogin, BlacklistedToken};