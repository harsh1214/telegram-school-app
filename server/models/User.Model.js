import { DataTypes } from "sequelize";

const User = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return User;
}

export default User;