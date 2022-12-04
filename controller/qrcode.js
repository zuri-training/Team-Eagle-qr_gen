const express = require("express")
const qrcode = require("../models/qrcode")
const session = require("express-session")
const cloudinary = require("cloudinary").v2
require("dotenv").config()
var sess

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
});

const qrcodegen = async (req, res) => {
    let sess = req.session

    if (sess.user) {
        
    } else {
        res.redirect('/user/login')
    }
}   

const getAllqrCode = (req, res) => {
    let sess = req.session
    if (sess.user) {
       
    } else {
        res.redirect('/user/login')
    }
}

const getqrCode = (req, res) => {
    let sess = req.session
    const {id: itemID} = req.params
    if(sess.user) {
        
    } else {
        res.redirect('/user/login')
    }
}

module.exports = {
    qrcodegen,
    getAllqrCode,
    getqrCode
}