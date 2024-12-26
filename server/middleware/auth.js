import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.sendStatus(401).json({ message: 'Access token is required' });
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err){
            return res.sendStatus(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
