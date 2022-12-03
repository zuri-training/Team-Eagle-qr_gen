const qrcode = require("../models/qrcode")
const QRCode = require("qrcode")
const multer = require("multer")
const bcrypt = require("bcrypt")

var sess

const qrcodegen = async (req, res) => {
    let sess = req.session

    const opts = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        color: {
         dark: '#208698',
         light: '#FFF',
        },
    }

    const details = req.body.text
    const password = req.body.password

    if(password === undefined) {
        if (details.length === 0) res.send("Empty Data!")
        QRCode.toDataURL(details, opts, function(err, QRcode) {
            if(err) return console.log("error occurred")
            /* console.log(QRcode) */

            //QRcode is store as base64
            res.json({status: "ok", QRcode})
        })
        /* QRCode.toString(details,opts,
            function (err, QRcode) {

        if(err) return console.log("error occurred")

        console.log(QRcode)
        }) */
    } else {
        
        const passwordd = await bcrypt.hash(password, 10)

        const protected = {
            data: details,
            key: passwordd
        }

        const protectedcode = JSON.stringify(protected)

        if (protectedcode.length === 0) res.send("Empty Data!")

        QRCode.toDataURL(protectedcode, opts, function(err, QRcode) {
            if(err) return console.log("error occurred")
            /* console.log(QRcode) */

            //QRcode is store as base64
            res.json({status: "ok", QRcode})
        })
       /*  QRCode.toString(protectedcode,opts,
                        function (err, QRcode) {

        if(err) return console.log("error occurred")

        console.log(QRcode)
    }) */
    }

    /* if(qrcodetype == 'menu') {
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
    } */
}   

const getAllqrCode = (req, res) => {
    let sess = req.session
    qrcode.find({user: sess.user}, (err, items) => {
        if(err) return console.log("error occurred" + err)
        res.json({status: 'OK', item: items})
    })
    /* if (sess.user) {
        
    } else {
        res.redirect('/user/login')
    } */
}

const getqrCode = (req, res) => {
    let sess = req.session
    const {id: itemID} = req.params
    qrcode.findOne({user: sess.user, _id: itemID}, (err, item) => {
        if(err) return console.log("error occurred" + err)
        res.json({status: 'OK', item: item})
    })
}

module.exports = {
    qrcodegen,
    getAllqrCode,
    getqrCode
}