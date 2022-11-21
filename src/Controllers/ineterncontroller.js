const collegemodel = require("../Models/collegemodel")
const internmodel = require("../Models/internmodel")



const createintern = async function(req,res){
    try {
        
        let data = req.body
    
        let {name,email,mobile,collegeName} = data
    
        if (!name) {return res.status(400).send({status:false,msg:"Enter a valid name"})}
        if (!mobile) { return res.status(400).send({status:false,msg:"Enter a valid mobile"})}
        if (!email) { return res.status(400).send({status:false,msg:"Enter a valid email"})}
        if (!collegeName){ return res.status(400).send({status:false,msg:"Enter a collegeName"})}
    
        function validName(N){
            const regex = /^[A-Z][a-z]{1,}(?: [A-Z][a-z]+){0,}$/;
            return regex.test(N)}
    
        function validmobile(M){
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return regex.test(M)
        }
    
        function validemail(E){
            const regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
            return regex.test(E)
        }


        let checkname = validName(name)
        let checkmobile = validmobile(mobile)
        let checkemail = validemail(email)
        
    
        if (!checkname) return res.status(400).send({status: false ,msg : "enter valid name"})
        if (!checkmobile) return res.status(400).send({status: false ,msg : "enter valid mobile"})
        if (!checkemail) return res.status(400).send({status: false ,msg : "enter valid email"})
    
        
        let collegeid = await collegemodel.findOne({name : data.collegeName })

        if (!collegeid._id){ return res.status(400).send({status:false,msg:"Enter a valid collegeid"})}
        
        data.collegeId = collegeid._id

        let interndata  = await internmodel.create(data)

        return res.status(201).send({status:true, data:interndata})

    
    } catch (error) {
        return res.status(500).send({status: false , msg : error.message})  
    }}


module.exports = {createintern}