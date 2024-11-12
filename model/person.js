var mongoose=require('mongoose');
var personSchema=mongoose.Schema({
    name:String,
    age:Number,
    place:String
});
var person=mongoose.model('person',personSchema);
module.exports=person;