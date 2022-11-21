const express = require ("express")

const router = express.Router()

const collegecontroller = require("../Controllers/collegecontroller")

const interncontroller =require("../Controllers/ineterncontroller")






router.post("/colleges",collegecontroller.createcollege)

router.post("/intern",interncontroller.createintern)

router.get("/intern",collegecontroller.getcollege)


module.exports = router