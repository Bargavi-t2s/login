const express= require('express');
const router = express.Router();
const passport=require('passport');
const control=require('../controllers/control');
const googlesign=require('../controllers/passport-setup');
router.get('/google',passport.authenticate('google',{
    scope:['profile']

}));
router.get('/',function(req,res)
{
    res.render('index',{
        errors:res.locals.errors,
        errors_msg:res.locals.errors_msg,
        isAuthenticated:false
    });
});
router.get('/index',function(req,res)
{
    res.render('index',{
        errors:res.locals.errors,
        errors_msg:res.locals.errors_msg,
        isAuthenticated:false
    });
});
router.get('/login',function(req,res)
{  
    res.render('login',{
        errors:res.locals.errors,
        errors_msg:res.locals.errors_msg,
        isAuthenticated:false
    });
});
<<<<<<< HEAD
  router.get('/google/redirect',passport.authenticate('google',{
=======
   router.get('/google/redirect',passport.authenticate('google',{
>>>>>>> 90b2deff53439299c9542f31408e997f935e027f
      successRedirect:'/home'
  }));
router.get('/home',function(req,res)
{  
    res.render('home',{
        errors:res.locals.errors,
        errors_msg:res.locals.errors_msg,
        isAuthenticated:true
    });
    
});
router.get('/register',function(req,res)
{  res.render('register',{
    errors:res.locals.errors,
    errors_msg:res.locals.errors_msg,
    isAuthenticated:false
});
});

router.get('/logout',function(req,res)
{ 
    req.logout();
<<<<<<< HEAD
    res.redirect('index');
=======
    res.redirect('login');
>>>>>>> 90b2deff53439299c9542f31408e997f935e027f
});


router.post('/register',control.postregister);

router.post('/login',control.postlogin);




<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 90b2deff53439299c9542f31408e997f935e027f
