const express = require("express")
const qrcode = require("../models/qrcode")
const QRCode = require("qrcode")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const app = express()
const localStorage = require("localStorage")

var sess



const qrcodegen = async (req, res) => {
    let sess = req.session
    const { id: qrcodetype } = req.params

    const opts = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        color: {
         dark: '#208698',
         light: '#FFF',
        },
    }

    if(qrcodetype == 'menu') {
        let data = {
            link: req.body.url
        }
         
        let details = JSON.stringify(data)
    
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toString(details,opts, function (err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)
            res.json({status: "ok"})
        })
    } else if(qrcodetype == 'card') {
        let data = {
            link: req.body.url,
            name: req.body.name,
            jobTitle: req.body.name,
            website: req.body.website,
        }
         
        let details = JSON.stringify(data)
    
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toString(details,opts, function (err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)
            res.json({status: "ok", data})
        })
    } else if(qrcodetype == 'web'){
        const details = req.body.url
    
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toString(details,opts, function (err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)
            res.json({status: "ok"})
        })
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