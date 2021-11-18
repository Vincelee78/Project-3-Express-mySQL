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

     woodColour() {
        return this.belongsToMany('WoodColour');
     },
        
    
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

const WoodColour = bookshelf.model('WoodColour',{
    tableName: 'wood_colours',
    wallBed() {
        return this.belongsToMany('Wallbed')
    }
})

const User = bookshelf.model('User',{
    tableName: 'users'
})

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_items',
    wallBed() {
        return this.belongsTo('WallBed', 'product_id' )
    }

})

const Admin = bookshelf.model('Admin',{
    tableName: 'admin'
})

const AdminLogin = bookshelf.model('AdminLogin', {
    tableName: 'beds_admin',
    wallBed() {
        return this.belongsTo('WallBed', 'wall_bed_id' )
    }

})
module.exports={ ProductTable, BedSize, BedOrientation, MattressType,FrameColour, WoodColour, User, CartItem, Admin, AdminLogin};