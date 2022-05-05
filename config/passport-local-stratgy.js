const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');    //Including schema into user.


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);      // this will going to render main content and allowing to enter in the sign-in page.
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// Deserilizing the user frim the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
   
});
//check if the user is authenticated.
passport.checkAuthentication = function(req, res, next){
    //if rhe user is signed-in, then pass on the req to the next function(controllar's action)
    if(req.isAuthenticated()){
       return next();
    }

    // if the user is not signed-in
    return res.redirect("/users/sign-in");
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //res.user contains the current signed in user from the session cookie and we are just sending this to locals for the views.
        res.locals.user = req.user;
    }
    next();
}
    
module.exports = passport;
