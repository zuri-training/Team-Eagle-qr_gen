const express = require("express")
const qrcode = require("../models/qrcode")
const QRCode = require("qrcode")
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const app = express()
const localStorage = require("localStorage")

var sess



const qrcodegen = (req, res) => {
    /* let sess = req.session
    if (sess.user) {
        
    } else {
        res.redirect('/user/login')
    } */
    let sess = req.session
    const url = req.body.url;
    if (url.length === 0) res.send("Empty Data!")
        QRCode.toString(url,{type:'terminal'}, function (err, QRcode) {
        
        if(err) return console.log("error occurred")
        console.log(QRcode)
        res.json({status: "ok"})

        /* try {
            var obj = {
                username: sess.user,
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + QRcode))
                }
            }
            image.create(obj, (err, item) => {
                if (err) {
                    console.log(err);
                }
                else {
                   return res.json({status: 'OK'})
                }
            });
        } catch (error) {
            console.log(error)
            return res.json({status: 'error'})
        } */

        /* QRCode.toDataURL(url, (err, src) => {
            if (err) res.send("Error occured");
            console.log(src)
            res.json({status: "ok"})
        }); */
    })
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