/**
 * Create by Zeen Wu on Sep 8th 
 * 
 */

 const mysql = require("mysql2")

 const db = {
 
     db : mysql.createPool({
         host: 'us-cdbr-east-06.cleardb.net',
         user: 'bfa9b8132cfd93',
         password: 'a80d49bb',
         database: 'heroku_a0f89b729a60af4'
     }).promise()
 
 }
  
 
 module.exports = db;



