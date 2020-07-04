function redirectLogin(req, res, next){
    if(!req.session.user){
        res.redirect('/signin');
    }
    else{
        next();
    }
}

function redirectHome(req, res, next){
    if(req.session.user){
        res.redirect('/');
    }
    else{
        next();
    }
}



module.exports ={
    redirectLogin: redirectLogin,
    redirectHome: redirectHome
}