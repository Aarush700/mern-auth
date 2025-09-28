import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.access_token; // safer optional chaining
        if (!token) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }

            req.user = decoded; // decoded = { id: ..., iat: ..., exp: ... }
            next();
        });
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(500).json({ message: 'Server error during authentication.' });
    }
};
