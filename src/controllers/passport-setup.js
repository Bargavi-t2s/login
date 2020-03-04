const passport=require('passport');
const googlestrategy =require('passport-google-oauth20');
passport.use(
    new googlestrategy({
        callbackURL:'http://localhost:3002/home',
        clientID:"665557267772-0qd6ju1p6j0c0f56npft5eavp3ii7edv.apps.googleusercontent.com",
        clientSecret:"Nh9W8j_2-sIu4kcRTEeOOq9V"
},(accessToken,refreshToken,profile,done)=>{
        console.log(profile);
        console.log('reached')
        
}
));
