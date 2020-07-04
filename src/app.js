const express = require('express');
const path = require('path');
const mainRouter = require('./backend/routes/mainRoute')
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const SQLstore = require('connect-sqlite3')(session);

const app = express();


app.set('views', path.join(__dirname, 'client', 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 4000);

app.use(session({
    store: new SQLstore,
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*60
    }
}))

app.use((req, res, next)=>{
    if(req.session.user){
        res.locals.user = req.session.user;
    }
    next();
})

app.use('/',mainRouter )

app.listen(app.get('port'), () =>{
    console.log("app is live")
})

module.exports = app;