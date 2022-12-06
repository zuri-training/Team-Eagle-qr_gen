const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()


var sess;

//User Login
const authUser = async(req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username}).lean()

    if (!user) {
        return res.json({status: 'error', error: 'Invalid Username/Password'})
    }

    if(await bcrypt.compare(password, user.password)) {

        jwt.sign(
            { 
                id: user._id, 
                username: user.username
            }, 
            process.env.JWT
        )
        sess = req.session
        sess.user = user._id    
        return res.json({status:'ok', user: sess.user})
    }
    res.json({status:'error', error: 'Invalid username/pasword'})
}


//User Registration
const registerUser = async(req, res) => {
    const {firstname, lastname, username, password: plainTextPassword, reEnterPassword} = req.body

    if(!username || typeof username !== 'string') {
        return res.json({
            status:'error',
            error: 'Invalid Username'
        })
    }

    if(plainTextPassword !== reEnterPassword) {
        return res.json({
            status: 'error',
            error: 'Password Does not Match'
        })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({
            status:'error',
            error: 'Invalid Password'
        })
    }

    if(plainTextPassword.length < 8) {
        return res.json({
            status:'error', 
            error: 'Password should be atleast 8'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        await User.create ({
            firstname,
            lastname,
            username,
            password
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({status:'error', error: 'Username Already in use'})
        } else {
            console.log(error)
            return res.json({status:'error', error: 'An error occurred during registration. Try again Later'})
        }
    }
    res.json({status:'OK'})
}

//User Logout
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
            return res.json({status:'error', error: 'An error occurred during signout. Try again Later'})
        }
        res.redirect('/user/login')
    })
}


//Change Password
const changePassword = async(req, res) => {
    let sess = req.session
    if (sess.user) {
        const {newPassword:plainTextPassword, reEnterPassword} = req.body

        const token = sess.user

        if(plainTextPassword.length < 8) {
            return res.json({
                status:'error', 
                error: 'Password should be atleast 8'
            })
        }

        if(plainTextPassword !== reEnterPassword) {
            return res.json({
                status:'error', 
                error: 'Password not the same'
            })
        }

        try{
            const user = jwt.verify(token, process.env.JWT)
            const _id = user.id

            const password = await bcrypt.hash(plainTextPassword, 10)

            await User.updateOne(
                {_id},
                {
                    $set: {password: password}
                }
            )
            res.json({status: 'ok'})
        } catch (error) {
            console.log(error)
            res.json({status:'error', error: 'Contact the Administrator'})
        }
    } else {
        res.redirect('/user/login')
    }
}

module.exports = {
    authUser, 
    registerUser, 
    logoutUser,
    changePassword
}