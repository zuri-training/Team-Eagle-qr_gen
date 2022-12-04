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

const storeQRcode = async (req, res) => {
    let sess = req.session

    if (sess.user) {
        const data = {
            image: req.body.image
        }

        cloudinary.uploader
        .upload(data.image)
        .then(async (result) => {
            const url = result.url
            await qrcode.create({
                userID: sess.user,
                imgUrl: url
            })
            res.json({status: "ok", url})
        })
        .catch((error) => {
            console.log(error)
            res.json({status: "error", error: "An error Occurred" })
        })
    } else {
        res.redirect('/user/login')
    }
}   

const getAllqrCode = async (req, res) => {
    let sess = req.session
    if (sess.user) {
       try {
            /* const user = sess.user
        
            const imageInfo = await qrcode.find({userID: user})
            imageInfo.forEach(element => {
                const QRcodes = element.imgUrl 
                console.log(QRcodes)
                res.json({status: "ok", QRcodes})
            }) */
       } catch (error) {
            console.log(error)
            res.json({status: "error"})
       }
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
    storeQRcode,
    getAllqrCode,
    getqrCode
}