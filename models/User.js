const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },{
        sequelize,
        hooks: {
            beforeCreate: userObj => {
                userObj.password = bcrypt.hashSync(userObj.password,3)
                return userObj;
            }
        }
    }
)

module.exports = User