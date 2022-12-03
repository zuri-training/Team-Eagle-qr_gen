const express = require("express")
const qrcode = require("../models/qrcode")
const QRCode = require("qrcode")
const bcrypt = require("bcrypt")
const session = require("express-session")
var sess

const qrcodegen = async (req, res) => {
    let sess = req.session

    if (sess.user) {
        const details = req.body.text
        const password = req.body.password
        
        const opts = {
            errorCorrectionLevel: 'H',
            type: 'terminal',
            quality: 0.95,
            color: {
                dark: '#208698',
                light: '#FFF',
            },
        }
    
        if(password === undefined) {
            if (details.length === 0) res.send("Empty Data!")
            QRCode.toDataURL(details,opts, (err, QRcode) => {
                if(err) return console.log("error occurred")
                /* console.log(QRcode) */
    
                //QRcode is store as base64
                
                qrcode.create({
                    user: sess.user,
                    img: {
                        data: QRcode,
                        contentType:  'image/png'
                    }
                })
                res.json({status: "ok", QRcode})
            })
        } else {
            const passwordd = await bcrypt.hash(password, 10)
    
            const protected = {
                data: details,
                key: passwordd
            }
    
            const protectedcode = JSON.stringify(protected)
    
            if (protectedcode.length === 0) res.send("Empty Data!")
    
            QRCode.toDataURL(protectedcode,opts, (err, QRcode) => {
                if(err) return console.log("error occurred")
                /* console.log(QRcode) */
    
                //QRcode is store as base64
                qrcode.create({
                    user: sess.user,
                    img: {
                        data: QRcode,
                        contentType:  'image/png'
                    }
                })
                res.json({status: "ok", QRcode})
            })
        }
    } else {
        res.redirect('/user/login')
    }
}   

const getAllqrCode = (req, res) => {
    let sess = req.session
    if (sess.user) {
        qrcode.find({user: sess.user}, (err, images) => {
            if(err) return console.log("error occurred" + err)
            res.json({status: 'OK', images})
        })
    } else {
        res.redirect('/user/login')
    }
}

const getqrCode = (req, res) => {
    let sess = req.session
    const {id: itemID} = req.params
    if(sess.user) {
        qrcode.findOne({user: sess.user, _id: itemID}, (err, image) => {
            if(err) return console.log("error occurred" + err)
            res.json({status: 'OK', image})
        })
    } else {
        res.redirect('/user/login')
    }
}

module.exports = {
    qrcodegen,
    getAllqrCode,
    getqrCode
}