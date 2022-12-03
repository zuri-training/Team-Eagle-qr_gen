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
            link: req.body.url,
            name: req.body.name,
            menu: req.body.menu,
            website: req.body.website,
        }
         
        let details = JSON.stringify(data)
    
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toDataURL(details, opts, function(err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)

            //QRcode is store as base64
            res.json({status: "ok", QRcode})
        })
    } else if(qrcodetype == 'card') {
        let data = {
            link: req.body.url,
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            website: req.body.website
        }
         
        let details = JSON.stringify(data)
    
        if (details.length === 0) res.send("Empty Data!")

        QRCode.toDataURL(details, opts, function(err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)

            //QRcode is store as base64
            res.json({status: "ok", QRcode})
        })

    } else if(qrcodetype == 'web'){
        const details = req.body.url
    
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toDataURL(details, opts, function(err, QRcode) {
            if(err) return console.log("error occurred")
            console.log(QRcode)

            //QRcode is store as base64
            res.json({status: "ok", QRcode})
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