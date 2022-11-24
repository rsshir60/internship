const collegemodel = require("../Models/collegemodel")
const internmodel = require("../Models/internmodel")
const {validName,validmobile,validemail} = require("../validations/Regex_validation")

//----------------------------------------------Create Intern-----------------------------------------------

const createintern = async function(req,res){

    try {
        
        let data = req.body
    
        let {name,email,mobile,collegeName} = data

        
        if (Object.keys(req.body).length == 0){return res.status(400).send({status:false ,msg: "empty req body"})}
    
        if (!name) {return res.status(400).send({status:false,msg:"Enter a valid name"})}
        if (!mobile) { return res.status(400).send({status:false,msg:"Enter a valid mobile"})}
        if (!email) { return res.status(400).send({status:false,msg:"Enter a valid email"})}
        if (!collegeName){ return res.status(400).send({status:false,msg:"Enter a collegeName"})}


        let Duplicate_email = await internmodel.findOne({email: email})
        if (Duplicate_email)return res.status(400).send({status: false ,msg : "Email already exist"})

        let Duplicate_mobile = await internmodel.findOne({mobile: mobile})
        if (Duplicate_mobile)return res.status(400).send({status: false ,msg : "mobile already exist"})

        let checkname = validName(name)
        let checkmobile = validmobile(mobile)
        let checkemail = validemail(email)  
    
        if (!checkname) return res.status(400).send({status: false ,msg : "enter valid name"})
        if (!checkmobile) return res.status(400).send({status: false ,msg : "enter valid mobile"})
        if (!checkemail) return res.status(400).send({status: false ,msg : "enter valid email"})
    
        
        let college = await collegemodel.findOne({name : data.collegeName })

        if (!college){ return res.status(400).send({status:false,msg:"Enter a valid college"})}
        
        data.collegeId = college._id

        let interndata  = await internmodel.create(data)

        const Data = {

                name: interndata.name,
                email: interndata.email,
                mobile: interndata.mobile,
                collegeId:interndata.collegeId  
            }

        return res.status(201).send({status:true, data:Data})

    
    } catch (error) {
        return res.status(500).send({status:false , msg : error.message})  
    }}


module.exports = {createintern}