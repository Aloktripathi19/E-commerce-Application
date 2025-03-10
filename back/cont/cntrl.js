const um = require("../model/modl")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const cm = require("../model/cartmodel")

let reg = async (req, res) => {
    try {
        let obj = await um.findById({ "_id": req.body._id })
        if (obj) {
            res.json({ "msg": "Email already exist" })
        } else {
            let hashcode = await bcrypt.hash(req.body.pwd, 10)
            let data = um({ ...req.body, "pwd": hashcode })
            await data.save()
            res.json({ "msg": "registration done" })

        }
    } catch (err) {
        res.json({ "msg": "err in reg" })
    }
}

let login = async (req, res) => {
    try {
        let obj = await um.findById({ "_id": req.body._id })
        if (obj) {
            let f = await bcrypt.compare(req.body.pwd, obj.pwd)
            if (f) {
                let data = await cm.find({ "uid": obj._id })

                res.json({ "token": jwt.sign({ "_id": obj._id }, "ecom"), "_id": obj._id, "name": obj.name, "role": obj.role, "cartlength": data.length })
            } else {
                res.json({ "msg": "Check password" })
            }
        } else {
            res.json({ "msg": "Check your mail" })
        }
    } catch (err) {
        res.json({ "msg": "Error in login" })
    }
}

let islogin = async (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, "ecom")
        next()
    } catch (err) {
        res.json({ "msg": "Please login first" })
    }
}

let isadmin = async (req, res, next) => {
    try {
        let obj = await um.findById({ "_id": req.headers.uid })
        if (obj && obj.role == "admin") {
            next()
        }
        else {
            res.json({ "msg": "you are not admin" })
        }
    }
    catch (err) {
        res.json({ "msg": "error in authorization" })
    }
}

module.exports = { reg, login, islogin, isadmin }