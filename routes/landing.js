const express = require("express");
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('landing/index')
})

router.get('/album/posters',(req,res)=>{
    res.render('landing/album')
})

router.get('/game/posters', (req,res)=>{
    res.render('landing/game')
})

router.get('/movie/posters', (req,res)=>{
    res.render('landing/movie')
})

module.exports=router;