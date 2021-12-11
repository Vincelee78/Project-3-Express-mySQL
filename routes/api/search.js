const express = require("express");
const router = express.Router();
const { ProductTable } = require("../../models");

router.get("/", async (req, res) => {
  try {
    let q = ProductTable.collection();

    if (req.query.name) {
      q.where("name", "like", `%${req.query.name}%`);
    }

    if (req.query.minCost) {
      q.where("cost", ">=", req.query.minCost*100);
    }

    if (req.query.maxCost) {
      q.where("cost", "<=", req.query.maxCost*100);
    }

    if (req.query.bedSize) {
      q.where("bed_size_id", "=", req.query.bedSize);
    }
    if (req.query.bedOrientation) {
      q.where("bed_orientation_id", "=", req.query.bedOrientation);
    }
    if (req.query.mattressType) {
      q.where("mattress_type_id", "=", req.query.mattressType);
    }
    if (req.query.frameColour) {
      q.where("frame_colour_id", "=", req.query.frameColour);
    }

    // if woodColour is not empty
    if (req.query.woodColour) {
      let selectedColours = req.query.woodColour.split(",");
      q.query(
        "join",
        "wall_beds_wood_colours",
        "wall_beds.id",
        "wall_bed_id"
      ).where("wood_colour_id", "in", selectedColours);
    }

    // execute the query
    let products = await q.fetch({
      withRelated: [
        "bedSize",
        "bedOrientation",
        "mattressType",
        "frameColour",
        "woodColour",
      ],
    });

    res.status(200);
    res.json(products);
    
  } catch (e) {
    
    res.status(500);
    res.send({
      error: "Error on search in server",
    });
  }
});

module.exports = router;
