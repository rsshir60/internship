const collegemodel = require ("../Models/collegemodel")
const internmodel = require("../Models/internmodel")
const {validName,validfullname,validlogolink} = require('../validations/Regex_validation')


//---------------------------------------------Create a college-------------------------------------------------------------------//

const createcollege = async function(req,res){
try {
    
    let data = req.body
    let {name,fullName,logoLink} = data

    if (!name) {return res.status(400).send({status:false,msg:"Enter a name"})}
    if (!fullName) { return res.status(400).send({status:false,msg:"Enter a fullname"})}
    if (!logoLink){ return res.status(400).send({status:false,msg:"Enter a logoLink"})}

    let Duplicatecollegename = await collegemodel.findOne({name: name})
    if (Duplicatecollegename)return res.status(400).send({status: false ,msg : "name already exist"})

    let checkname = validName(name)
    let checkfullname = validfullname(fullName)
    let checkvalidlink = validlogolink(logoLink)

    if (!checkname) return res.status(400).send({status: false ,msg : "enter valid name"})
    if (!checkfullname)return res.status(400).send({status: false ,msg : "enter valid fullname"})
    if(!checkvalidlink)return res.status(400).send({status: false ,msg : "enter valid logolink"})


    let collegedata = await collegemodel.create(data)
    return res.status(201).send ({status:true, data:collegedata})

} catch (error) {
    return res.status(500).send({status: false , msg : error.message})  
}}


//--------------------Returns the list of all interns who have applied for internship at this college.-------------------------------------------


const getcollege = async function(req,res){

   try {

    let Cname = req.query.collegeName
    if (Object.keys(req.query).length == 0){return res.status(400).send({status:false ,msg: "enter college name"})}

    let college = await collegemodel.findOne({name:Cname}).select({_id:1,name:1,logoLink:1,fullName:1})
    if (!college) return res.status(404).send({status:false,msg:"college data not found"})

    let interndata = await internmodel.find({collegeId: college._id}).select({name:1,email:1,mobile:1})
    if (interndata.isDeleted == true){return res.status(400).send({status: false , msg: "intern is already deleted"})}
    if (!interndata) return res.status(400).send({status : false, msg:"no intern here"})

    let Objectdata = {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: interndata
    }

    return res.status(200).send({status: true, data: Objectdata})

} catch (error) {

     return res.status(500).send({status: false , msg : error.message})  
   } 

}

module.exports = {createcollege,getcollege}