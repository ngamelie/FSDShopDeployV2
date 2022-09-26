/**
 * Create on Sep 13th 
 * Code by Zeen Wu
 */
 
// dependency
const express = require("express")
const router = require('express').Router();
const bodyParser = require("body-parser")
const cors = require("cors")
const bcryptjs = require('bcryptjs')
// module
const config = require('../../config/config');
const rep = require ('../../repository/repUser')
// app init
router.use(express())
router.use(express.json())
router.use(cors())

// -- login ---------------------------------------- //
router.post("/", async(req, res) => {
    const obj = req.body   
    var rsObj = {
        "isAuth" : 0,
        "user" : null
    }

    await rep.getOneByEmail(obj.uemail).then((rs) => {
        bcryptjs.compare(obj.pword, rs.pword, function(err, result){
            if (result) {
                rsObj.isAuth = 1
                rsObj.user = rs
                res.send(rsObj)
            } else {
                res.send(rsObj)
            }
        })

    })
    
})

router.get("/logoff", (req, res) => {
    session.user = null
    res.send({ loggedIn: false})
})

module.exports = router;

