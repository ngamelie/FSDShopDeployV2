/**
 * Create on Sep 12th 
 * Code by Zeen Wu
 */
 
// dependency
const express = require("express")
const router = require('express').Router();
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require('bcryptjs')
const session = require('express-session');
// module
const rep = require ('../../repository/repUser')
const config = require('../../config/config');
// app init
router.use(cors())
router.use(express.json())
router.use(cors())
//router.use(session({secret: 'ssshhh'}))



// -- new one ---------------------------------------- //
router.post("/", (req, res) => {
    const obj = req.body   
    var bcry = ""

    bcrypt.hash(obj.pword, 10, (err, hash) => {
        if (err) {
            console.log(err)
            return
        }
        bcry = hash
    })

    setTimeout(async ()=>{
        try {
            obj.pword = bcry
            var msg = await rep.newOne(obj)
            res.send(msg)
        } catch (e) {
            console.error('error is:', e.message);
            res.send(e.message)
        }
    
    }, 500);

    
})

// -- get one By Id ------------------------------------------------ //
router.get("/:id", config.isUser, async(req, res) => {
    const id = req.params.id
    try {
        const obj = await rep.getOne(id)
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

router.get("/users", config.isAdmin, async(req, res) => {
    try {
        const obj = await rep.getAll()
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- get all------------------------------------------------ //
router.get("/", config.isAdmin, async(req, res) => {
    try {
        const obj = await rep.getAll()
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- delete ------------------------------------------------ //
router.delete("/del/:id", config.isAdmin, async(req, res) => {
    const id = req.params.id
    try {
        const rs = await rep.delOne(id)
        res.send(rs)  
    } catch (e) {
        console.error('error is:', e.message);
        res.send()  
    }
     
})


// -- update ------------------------------------------------ //
router.put("/update", config.isUser, async(req, res) => {
    const obj = req.body
    
    try {
        const rs = await rep.updateOne(obj)
        res.send(rs)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- update user info------------------------------------------------ //
router.put("/updateUserInfo", config.isUser, async(req, res) => {
    const obj = req.body
    try {
        const rs = await rep.updateUserInfo(obj)
        res.send(rs)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})



module.exports = router;

