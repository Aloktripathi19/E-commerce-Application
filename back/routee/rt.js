let express = require("express")
const { reg, login, islogin, isadmin } = require("../cont/cntrl")
const { getprod, add, upload, edit, delprod, addcomm } = require("../cont/prodcntrl")
const { addcart, getcart, inc, dec, delcart, countcart } = require("../cont/cartcont")
let routes = express.Router()

routes.post("/reg",reg)
routes.post("/login",login)
routes.post("/add",upload.single("pimg"),islogin,isadmin,add)
routes.get("/products",getprod)
routes.post("/addcart",islogin,addcart)
routes.get("/getcart/:uid",islogin,getcart)
routes.get("/inc/:cid",islogin,inc)
routes.get("/dec/:cid",islogin,dec)
routes.delete("/delcart/:cid",islogin,delcart)
routes.put("/edit",islogin,isadmin,edit)
routes.delete("/delete/:pid",islogin,islogin,delprod)
routes.post("/comment",islogin,addcomm)


module.exports = routes