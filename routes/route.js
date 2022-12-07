const express = require("express")
const router = express.Router()

const {
    authUser,
    registerUser,
    logoutUser,
    changePassword
} = require("../controller/auth")

const {
    storeQRcode,
    getAllqrCode,
    getqrCode,
    sites,
    deleteSingleQR,
    deleteEntireQR,
    updateQr
} = require("../controller/qrcode")


//Authentication
router.route('/user/login').post(authUser)
router.route('/user/register').post(registerUser)
router.route('/user/changepassword').post(changePassword)
router.route('/user/logout').get(logoutUser)


//QR code Generator
router.route('/user/qrCode').get(getAllqrCode)
router.route('/user/qrCode/:id').get(getqrCode)
router.route('/storeQRcode').post(storeQRcode)
router.route('/updateQr').patch(updateQr)
router.route('/deleteSingleQR').delete(deleteSingleQR)
router.route('/deleteEntireQR').delete(deleteEntireQR)


//dynamic site
router.route('/user/:userID&:qrcodeID&:qrcodeType').get(sites)

module.exports = router