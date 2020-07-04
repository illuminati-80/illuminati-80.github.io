const db = require('../databases/sqlite');
const User = db.users;
const List = db.lists;


async function signup(req,res){
    const {name, email, password} = req.body;
    let msg = '';
    if(!name || !email || !password){
        msg = "Enter all the details";
        return res.render('singup',{msg: msg});
    }else{
        try{
            const [user, created] = await User.findOrCreate({
                where: {email : email},
                defaults: {
                    name: name,
                    password: password
                }
            })
            if(created){
                req.session.user = user.dataValues;
                return res.redirect('/');
            }
            else{
                msg = 'email already taken';
                return res.render('signup', {msg:msg});
            }
        }
        catch{
            msg = "some error occured";
            return res.render('signup', {msg: msg});
        }
        
    }
}


async function signin(req, res){
    const {email, password} = req.body;
    let msg= '';

    if(!email || !password){
        msg = 'Enter all the required details';
        return req.render('signin',{msg:msg})
    }else{
        try{
            const userCheck = await User.findOne({
                where: {
                    email : email
                }
            })
            if(userCheck === null){
                msg = 'email not found!';
                return res.render('signin', {msg: msg});
                
            }else{
                console.log('hello')
                if(userCheck.password === password){
                    req.session.user = userCheck;
                    return res.redirect('/');
                }else{
                    msg = 'Password did not match';
                    return res.render('signin', {msg: msg})
                }
            }
        }catch{
            msg = 'Some error occured! please try after some time';
            return res.render('signin', {msg: msg});
        }
    }
}


function signout(req, res){
    req.session.destroy(err =>{
        if(err){
            console.log('error');
            return res.redirect('/');
        }
    })

    return res.redirect('signin')
}

function addList(req,res){
    const text = req.body.newTodo;
    if(!text){
        console.log('Enter The text first')
        return res.redirect('/');
    }else{
        List.create({
            item: text,
            edit: 'false',
            done: 'false',
            user_id: req.session.user.id
        })
        .then(list =>{
            if(list){
                console.log(list.toJSON());
                
            }
        })
        .catch(err =>{
            console.log(err)
        })
        return res.redirect('/');
    }
}

function deleteOne(req, res){
    const listId = req.body.id;
    List.destroy({
        where:{
            id : listId
        }
    })
    .then(() =>{
        console.log("entry deleted successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
    return res.redirect('/')

}

function doneOne(req,res){
    const listId = req.body.id;
    List.findOne({
        where:{
            id: listId
        }
    })
    .then(row =>{
        row.done = 'done';
        row.save();
        return res.redirect('/');
    })
    .catch(err =>{
        console.log(err)
    })
}

function edit(req,res){
    var listId = req.body.id;
    var newText= req.body.newText;
    List.findOne({
        where:{
            id: listId
        }
    })
    .then(row =>{
        row.item= newText;
        row.save();
        return res.redirect('/');
    })
    .catch(err =>{
        console.log(err);
    })
}




module.exports = {
    signup: signup,
    signin: signin,
    signout: signout,
    addList: addList,
    deleteOne: deleteOne,
    doneOne: doneOne,
    edit: edit
}