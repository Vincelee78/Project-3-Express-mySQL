const express = require("express");
const router = express.Router();
const {
    checkIfAuthenticated
} = require('../middleware');

const {
    Order,
}


router.get('/',checkIfAuthenticated, async (req, res) => {

    // 1. get all the bed sizes
    const allBedSize = await dataLayer.getAllBedSize();
    allBedSize.unshift([0, 'All Bed Sizes']);

    const allBedOrientation = await dataLayer.getAllBedOrientation();
    allBedOrientation.unshift([0, 'All Bed Orientations']);

    const allMattressType = await dataLayer.getAllMattressType();
    allMattressType.unshift([0, 'All Mattress Types']);

    const allFrameColour = await dataLayer.getAllFrameColours();
    allFrameColour.unshift([0, 'All Frame Colours']);

    // 2. Get all the wood colours
    const allWoodColours = await dataLayer.getAllWoodColours();


    // 3. Create search form 
    let searchForm = createSearchForm(allBedSize, allBedOrientation, allMattressType, allFrameColour, allWoodColours);

    searchForm.handle(req, {
        'empty': async (form) => {
            // the model represents the entire table
            let orderItems = await Order.collection().fetch({
                'withRelated': ['wallBedUser', 'status']
            });

            let orders = orderItems.toJSON().map((wallBed) => {
                return {
                    ...wallBed,
                    cost: wallBed.cost / 100
                };
            });

            res.render('orders/shipping', {
                'orders': orders,
                'searchForm': form.toHTML(bootstrapField),
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,
                'allWoodColours': allWoodColours
            })
        },
        'error': async (form) => {},
        'success': async (form) => {
            let name = form.data.name;
            let cost_min = form.data.cost_min;
            let cost_max = form.data.cost_max;
            let bedSize = parseInt(form.data.bed_size_id);
            let bedOrientation = parseInt(form.data.bed_orientation_id);
            let mattressType = parseInt(form.data.mattress_type_id);
            let frameColour = parseInt(form.data.frame_colour_id);
            let woodColour = form.data.woodColour;

            // create a query that is the eqv. of "SELECT * FROM products WHERE 1"
            // this query is deferred because we never call fetch on it.
            // we have to execute it by calling fetch onthe query
            let q = ProductTable.collection();

            // if name is not undefined, not null and not empty string
            if (name) {
                // add a where clause to its back
                q.where('name', 'like', `%${name}%`);
            }

            if (cost_min) {
                q.where('cost', '>=', cost_min);
            }

            if (cost_max) {
                q.where('cost', '<=', cost_max);
            }


            // check if cateogry is not 0, not undefined, not null, not empty string
            if (bedSize) {
                q.where('bed_size_id', '=', bedSize);
            }
            if (bedOrientation) {
                q.where('bed_orientation_id', '=', bedOrientation);
            }
            if (mattressType) {
                q.where('mattress_type_id', '=', mattressType);
            }
            if (frameColour) {
                q.where('frame_colour_id', '=', frameColour);
            }

            // if tags is not empty
            if (woodColour) {
                let selectedTags = woodColour.split(',');
                q.query('join', 'wall_beds_wood_colours', 'wall_beds.id', 'wall_bed_id')
                    .where('wood_colour_id', 'in', selectedTags);

            }

            // execute the query
            let orders = await q.fetch({
                'withRelated': ['bedSize', 'bedOrientation', 'mattressType', 'frameColour', 'woodColour']
            });

            res.render('orders/shipping', {
                'orders': orders.toJSON(), // convert the results to JSON
                'searchForm': form.toHTML(bootstrapField),
                'allWoodColours': allWoodColours,
                'allBedSize': allBedSize,
                'allBedOrientation': allBedOrientation,
                'allMattressType': allMattressType,
                'allFrameColour': allFrameColour,

            })

        }
    })
})


module.exports = router;