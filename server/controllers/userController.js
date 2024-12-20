const pool = require('../db');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

const fetchUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};


exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const date = new Date();
        if (!name || !email || !password) {
            if(!name){
                return res.status(400).json({ message: 'Name is required.' });
            }
            if(!email){
                return res.status(400).json({ message: 'Email is required.' });
            }
            if(!password){
                return res.status(400).json({ message: 'Password is required.' });
            }
        }
        const userExist = await fetchUserByEmail(email);
        if(userExist){
            return res.status(500).json({ message: 'User already exist with this email' });
        }
        else{
            const encPass = await bcrypt.hash(password, salt);
            const result = await pool.query('INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, ?)', [name, email, encPass, date]);
            if(result){
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
                res.status(201).json({ success: true, message: "User Created", token});
            }
            else{
                return res.status(500).json({ message: 'Something went Wrong from Our Side! Please contact the admin' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            if(!email){
                return res.status(400).json({ message: 'Email is required.' });
            }
            if(!password){
                return res.status(400).json({ message: 'Password is required.' });
            }
        }
        const userExist = await fetchUserByEmail(email);
        if(!userExist){
            return res.status(500).json({ message: "User Doesn't Exist" });
        }
        else{
            const user = await fetchUserByEmail(email);
            // const result = await pool.query('INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, ?)', [name, email, encPass, date]);
            const checkPass = await bcrypt.compare(password, user.password);
            if(user.email == email && checkPass){
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
                // res.status(201).json({message: "Logged In", token});
                const options = {
                    expires: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)),
                    httpOnly: true,
                };
                res.status(201).cookie("token", token, options).json({ success: true, message: "Logged In", token });
            }
            else{
                return res.status(500).json({ message: 'Password is Incorrect' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

// Routes
// 1. Create a new user
// app.use('/user', );

// 2. Read all users
// app.get('/users', async (req, res) => {
//     try {
//         const [rows] = await pool.query('SELECT * FROM users');
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });

// 3. Read a single user by ID
// app.get('/users/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id, 10);
//         const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

//         if (rows.length === 0) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         res.status(200).json(rows[0]);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });

// 4. Update a user by ID
// app.put('/users/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id, 10);
//         const { name, email } = req.body;

//         if (!name && !email) {
//             return res.status(400).json({ message: 'Name or email must be provided.' });
//         }

//         const [result] = await pool.query('UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?', [name, email, userId]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
//         res.status(200).json(updatedUser[0]);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });

// 5. Delete a user by ID
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id, 10);

//         const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         res.status(200).json({ message: 'User deleted successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });
