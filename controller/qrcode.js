const express = require("express")
const qrcode = require("../models/qrcode")
const QRCode = require("qrcode")
const multer = require("multer")
const app = express()
const localStorage = require("localStorage")

var sess



const qrcodegen = (req, res) => {
    /* let sess = req.session
    if (sess.user) {
        
    } else {
        res.redirect('/user/login')
    } */
    const url = req.body;
    if (url.length === 0) res.send("Empty Data!")
        QRCode.toString(url,{type:'terminal'}, function (err, QRcode) {
        
            if(err) return console.log("error occurred")
            console.log(QRcode)
    })
    
    QRCode.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
        console.log(src)
        res.json({status: "ok"})
    });
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
    if (sess.user) {
        
    } else {
        res.redirect('/user/login')
    }
}

module.exports = {
    qrcodegen,
    getAllqrCode,
    getqrCode
}