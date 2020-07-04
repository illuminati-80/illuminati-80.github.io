const db = require('../databases/sqlite');
const List = db.lists;


function profile(req,res){
    let listItem=[] ;
    List.findAll({
        where:{
            user_id : req.session.user.id
        }
    })
    .then(list =>{
        // console.log(list)
        listItem = list;
        res.render('profile', {
            listItems: listItem
        })
    })
    .catch(err =>{
        console.log(err)
    })
    
    
}

function signin(req,res){
    res.render('signin')
}

function signup(req,res){
    res.render('signup')
}

module.exports = {
    profile: profile,
    signin: signin,
    signup: signup
}