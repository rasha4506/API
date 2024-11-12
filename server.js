var express=require('express');
var app=express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/family')


var person = require('./model/person.js');

app.get('/send',function(req,res){
    res.json({name:"rasha"})
});

// insert into form

app.post('/detail',function(req,res){
    var per=new person({
        name:req.body.name,
        age:req.body.age,
        place:req.body.place
    });
    per.save(function(err,response){
        if(err){
            res.send("error");
        }
        else{
            res.send("success");
        }
    });
});

// insertion completed..

// show the details
 app.get('/show',function(req,res){
    person.find(function(err,response){  
        //  ivde person ann kodkendath bcz file name is person
        res.json(response) 
    });

 });
 // details shown..
 //delete the details
 app.delete('/delete',function(req,res){
    var n=req.body.name
    person.deleteOne({name:n},function(err,response){
        if(err){
            res.json("error");

        }
        else{
            res.json("success"); 
        }
    });
 });
 //deletion completed.. 

 // edit 

 app.get('/edit/:id',function(req,res){
    person.findById(req.params.id,function(err,response){
        res.render('edit',{'data':response});
    });
 });
 app.post('/edit/:id',function(req,res){
    console.log(req.params.id);
    console.log(req.body);
    if (req.body.age) {
        req.body.age = Number(req.body.age);
    }
    person.findByIdAndUpdate(req.params.id,req.body, { new: true },function(err,response){
     if(err){
         res.json({message:"error in updating person"});
        }
    else{
        res.redirect('/list/?message=success');   
        }
    });
 });
 app.listen(8080); 