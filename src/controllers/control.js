const express= require('express');
const router = express.Router();
const db=require('../models/db1');

exports.postlogin= (req,res)=>
{  
    var email1= req.body.email;
    var password1=req.body.password;
    req.checkBody('email','Email is required').notEmpty();    
    req.checkBody('email','Invalid Email address').isEmail();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password','Minimum of eight characters is required').isLength({ min: 8 });
    var errors=req.validationErrors();
    if(errors)
     {
         res.render('login',{
             errors:errors,
             isAuthenticated:false
            });
    }
    else{
        db.authenticateuser(email1,password1,function(response){
            if(response)
            {   req.flash('errors_msg', "you have successfully logged into the application");
                req.flash('isAuthenticated',true);
                res.redirect('/home');
            }
            else{
                res.render('login',{
                    errors_msg:"Invalid username or password",
                    isAuthenticated:false
                })
            }
        });
     }
}

exports.postregister=(req,res) =>
{   
    var email= req.body.email;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    req.checkBody('email','Email is required').notEmpty();    
    req.checkBody('email','Invalid email address').isEmail();

    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password','Minimum of eight characters is required').isLength({ min: 8 });
    req.checkBody('cpassword','Passwords do not match').equals(req.body.password);
  
    var errors=req.validationErrors();
    if(errors)
     {    
         res.render('register',{
             errors:errors,
             isAuthenticated:false
         });
    }
    else{
       db.authenticateemail(email,function(response){          
        if(response)
        {   
             
           req.flash('errors_msg',"Email id has been already registered! Login to continue");
            res.redirect('/login');
        }

        else{
            db.insertDocuments(email,password,function(){ });
            req.flash('errors_msg',"You have succesfully registered, now you can login ");
            req.flash('isAuthenticated',false);
            res.redirect('/login');   
        }
       });           
    }
}