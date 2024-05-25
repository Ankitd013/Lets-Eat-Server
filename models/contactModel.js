const mongoose =require('mongoose');

var Contactschema=new mongoose.Schema({
contactname:{
    type:String,
    
},
contactemail:{
    type:String,
    
},
contactphone:{
    type: Number,
    
},
contactmessage:{
    type:String,

}
});
module.exports = mongoose.model('Contact',Contactschema);