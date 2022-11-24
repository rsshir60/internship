

//----------------------Regex-Validation-------------------------

function validName(name){
    const regex = /^[a-zA-Z\s]*$/g;
    return regex.test(name)}

function validfullname(fullName){
    const regex = /^[a-zA-Z\s]*$/g;
    return regex.test(fullName)
}

function validlogolink(logoLink){
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    return regex.test(logoLink)
}

function validmobile(Mobile){
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(Mobile)
}

function validemail(Email){
    const regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return regex.test(Email)
}


module.exports = {validName,validfullname,validlogolink,validmobile,validemail}