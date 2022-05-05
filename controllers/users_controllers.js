const User=require('../models/user')

// =======================================================================================================================================================

// module.exports.profile=function(req,res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id, function(err,user){
//             if(user){
//                 return res.render('user_profile',{
//                     title: "User Profile",
//                     user: user
//                 })
//             }else{
//                 return res.redirect('/users/sign-in')
//             }
//         })
//     }else{
//         return res.redirect('/users/sign-in')
//     }
    
// }

module.exports.profile=function(req,res){
    
        User.findById(req.params.id, function(err,user){
            
                return res.render('user_profile',{
                    title: "User Profile",
                    Profile_user: user
                }
        
            )}
      
        )}
    
    




// ================================================================================================================================================================
    // render the sign-up page
    module.exports.signUp = function(req,res){
        if(req.isAuthenticated()){
            return res.redirect("/users/sign-in");
        }
        return res.render('user_sign_up',{
            title:"Codial | Sign up"
        })
    }


// ===================================================================================================================================================================
    // render the sign In page
    module.exports.signIn = function(req,res){
        if(req.isAuthenticated()){
            return res.redirect("/users/profile");
        }
        return res.render('user_sign_in',{
            title:"Codial | Sign In"
        })
    }


    module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    } 

    User.findOne({email: req.body.email},function(err,user){
    if(err){console.log('error in finding the user insigninh up');return}


    if(!user){User.create(req.body, function(err,user){
        if(err){console.log('error in creating the user in signing up');return }
        return res.redirect('/users/sign-in')
    
    })

    }else{
        return res.redirect('back')
    }
});
}
    
// =====================================================================================================================================================================================
        
            module.exports.createSession=function(req,res){
            // Steps to authenticate
            // Find the user
            User.findOne({email: req.body.email},function(err,user){
                if(err){console.log('error in finding the user in sign in');return}
            // handle user found
            if(user){
                // handle password which does't match
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                // handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile')
            }else{
                return res.redirect('back');
            }
    });

}
// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}
        
    