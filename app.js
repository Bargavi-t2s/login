var express =require('express');
var path = require('path');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
//var exphbs = require ('express-handlebars');
var expressvalidator = require('express-validator');
var flash = require('req-flash');
var session = require('express-session');
var passport = require('passport');
var Localstrategy= require('passport-local').Strategy;
var routes= require('./src/routes/index');


var app = express();

app.set('views', path.join(__dirname, 'src/views')) // Redirect to the views directory inside the src directory
app.use(express.static(path.join(__dirname, 'public'))); // load local css and js files

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());

app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

//expressvalidator
app.use(expressvalidator({
    errorFormatter: function(param,msg,value)
    {
        var namespace= param.split('.')
        , root =namespace.shift()
        , formParam = root;
        
        while(namespace.length)
        {
            formParam += '[' + namespace.shift()+']';
        
        }
        return {
            param: formParam,
            msg: msg,
            value:value
        };
    }
}));

app.use(cookieparser());

app.use(flash());


app.use(function(req,res, next)
{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.errors= req.flash('errors');
    res.locals.isAuthenticated=req.flash('isAuthenticated');
    next();
});

app.use('/',routes);
//app.use('/users',users);

//initRoutes(app);
<<<<<<< HEAD
const port = 3002;
app.listen(port, () => console.log(`Server listening on port ${port}`));
=======
const port = 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
>>>>>>> 90b2deff53439299c9542f31408e997f935e027f
