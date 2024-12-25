import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.Model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);

export default db;