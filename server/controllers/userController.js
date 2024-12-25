import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = db.User;
const salt = bcrypt.genSaltSync(10);

// const pool = require('../config/db');
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
// const fetchUserByEmail = async (email) => {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows.length > 0 ? rows[0] : null;
// };

export const createUser = async (req, res) => {
    const date = new Date();
    var user = req.body;
    user.date = date;
    if (!user.fullName || !user.email || !user.password) {
        if (!user.fullName) {
            return res.status(400).json({ message: 'Name is required.' });
        }
        if (!user.email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Password is required.' });
        }
    }
    try {
        const findUser = await User.findOne({ where: { email: user.email } }).catch((err) => {
            console.log(err);
        });
        if(!findUser){
            const encPass = await bcrypt.hash(user.password, salt);
            user.password = encPass;
            const response = await User.create(user);
            if (!response) {
                res.status(500).json({ message: "INTERNAL SERVER ERROR" });
            }
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "2h" });
            res.status(201).json({ success: true, message: "User Created", token });
        }
        else{
            res.status(400).json({ message: "User Already Exist with same Email" });
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}

export const loginUser = async (req, res) => {
    var user = req.body;
    if (!user.email || !user.password) {
        if (!user.email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Password is required.' });
        }
    }
    try {
        const findUser = await User.findOne({ where: { email: user.email }}).catch((err) => { console.log(err); });;
        if(findUser){
            const checkPass = await bcrypt.compare(user.password, findUser.dataValues.password);
            if(user.email == findUser.dataValues.email && checkPass){
                const token = jwt.sign({ email: user.email  }, process.env.JWT_SECRET, { expiresIn: "2h" });
                const options = {
                    expires: new Date(Date.now() + (2 * 60 * 60 * 1000)),
                    httpOnly: true,
                };
                return res.status(201).cookie("token", token, options).json({ success: true, message: "Logged In", fullName: findUser.dataValues.fullName, email: user.email, token });
            }
            else{
                return res.status(500).json({ message: 'Password is Incorrect' });
            }
        }
        else{
            res.status(400).json({ message: "User Doesn't Exist with this Email" });
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}


// exports.createUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const date = new Date();
//         if (!name || !email || !password) {
//             if(!name){
//                 return res.status(400).json({ message: 'Name is required.' });
//             }
//             if(!email){
//                 return res.status(400).json({ message: 'Email is required.' });
//             }
//             if(!password){
//                 return res.status(400).json({ message: 'Password is required.' });
//             }
//         }
//         const userExist = await fetchUserByEmail(email);
//         if(userExist){
//             return res.status(500).json({ message: 'User already exist with this email' });
//         }
//         else{
//             const encPass = await bcrypt.hash(password, salt);
//             const result = await pool.query('INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, ?)', [name, email, encPass, date]);
//             if(result){
//                 const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
//                 res.status(201).json({ success: true, message: "User Created", token});
//             }
//             else{
//                 return res.status(500).json({ message: 'Something went Wrong from Our Side! Please contact the admin' });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// }

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             if(!email){
//                 return res.status(400).json({ message: 'Email is required.' });
//             }
//             if(!password){
//                 return res.status(400).json({ message: 'Password is required.' });
//             }
//         }
//         const userExist = await fetchUserByEmail(email);
//         if(!userExist){
//             return res.status(500).json({ message: "User Doesn't Exist" });
//         }
//         else{
//             const user = await fetchUserByEmail(email);
//             const checkPass = await bcrypt.compare(password, user.password);
//             if(user.email == email && checkPass){
//                 const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
//                 const options = {
//                     expires: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)),
//                     httpOnly: true,
//                 };
//                 res.status(201).cookie("token", token, options).json({ success: true, message: "Logged In", token });
//             }
//             else{
//                 return res.status(500).json({ message: 'Password is Incorrect' });
//             }
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// }