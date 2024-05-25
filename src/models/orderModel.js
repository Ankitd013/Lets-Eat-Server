const mongoose=require('mongoose')
var Order=mongoose.model('order',{

    fname: {type: String},
    fdesc: {type: String},
    cname: {type: String},
    cemail: {type: String},
    cphone: {type: String},
    caddress: {type: String},
    quan:{type:Number},
    price:{type:Number},
    date:{type:Date}

})
module.exports={Order}