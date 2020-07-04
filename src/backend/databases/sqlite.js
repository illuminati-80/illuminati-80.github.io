const Sequelize = require('sequelize');

var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './backend/databases/database.sqlite',
    // logging: false
});

var users = sequelize.define('user',{
   
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

var lists = sequelize.define('list', {
    
    item:{
        type: Sequelize.STRING,
        allowNull: false
    },
    edit:{
        type: Sequelize.BOOLEAN,
    },
    done:{
        type: Sequelize.STRING
    },
    user_id:{
        type: Sequelize.NUMBER,
        allowNull: false
    }
});

sequelize.sync()
    .then(()=>{
        console.log('tables created successfully')
    })
    .catch(error =>{
        console.log(error);
    });

module.exports = {
    users: users,
    lists: lists
}
