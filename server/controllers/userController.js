import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/nodeMailer.js";
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

export const forgotPassword = async (req, res) => {
    var user = req.body;
    if (!user.email) {
        return res.status(400).json({ message: 'Email is required.' });
    }
    try {
        const findUser = await User.findOne({ where: { email: user.email }}).catch((err) => { console.log(err); });;
        if(findUser){
            const generatedOTP = Math.floor(100000 + Math.random() * 900000);
            const to = user.email;
            const subject = "OTP Request from Telegram App";
            const message = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <h4>Hi ${findUser.fullName},</h4>
                    <p>You request OTP is ${generatedOTP}</p>
                </body>
                </html>
            `;
            const mail = await sendMail(to, subject, message);
            if(mail){
                findUser.otp = generatedOTP;
                await findUser.save();
                return res.status(201).json({ success: true, message: "OTP Send" });
            }
            else{
                return res.status(500).json({ message: 'Something Went Wrong!' });
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

export const verifyOtp = async (req, res) => {
    var user = req.body;
    if (!user.OTP) {
        return res.status(400).json({ message: 'OTP is required.' });
    }
    try {
        const findUser = await User.findOne({ where: { email: user.email }}).catch((err) => { console.log(err); });;
        if(findUser){
            if(user.OTP == findUser.otp){
                return res.status(201).json({ success: true, message: "OTP is Correct" });
            }
            else{
                return res.status(500).json({ success: false, message: 'OTP is Incorrect' });
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

export const changePassword = async (req, res) => {
    var user = req.body;
    if (!user.password) {
        return res.status(400).json({ message: 'Password is required.' });
    }
    try {
        const findUser = await User.findOne({ where: { email: user.email }}).catch((err) => { console.log(err); });;
        if(findUser){
            if(user.OTP == findUser.otp){
                const encPass = await bcrypt.hash(user.password, salt);
                findUser.password = encPass;
                await findUser.save();
                return res.status(201).json({ success: true, message: "Password Changed" });
            }
            else{
                return res.status(500).json({ message: 'Something Went Wrong! ' });
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