import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;



        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
            req.role = decodedData?.role; // Set user role
            
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.id;
        }
        if (req.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;