const sequelize = require("../config/connection");

const Comment = require("./Comment")
const Post = require("./Post")
const User = require("./User")

// Comment [One] to Post [Many]
Comment.belongsTo(Post,{
    foreignKey: {
        allowNull: false
    }
})
Post.hasMany(Comment,{
    foreignKey: {
        allowNull: false
    }
})

// Post [One] to User [Many]
Post.belongsTo(User,{
    foreignKey: {
        allowNull: false
    }
})
User.hasMany(Post,{
    foreignKey: {
        allowNull: false
    }
})

// Comment [One] to User [Many]
Comment.belongsTo(User,{
    foreignKey: {
        allowNull: false
    }
})
User.hasMany(Comment,{
    foreignKey: {
        allowNull: false
    }
})

module.exports = {
    Comment,
    Post,
    User
}