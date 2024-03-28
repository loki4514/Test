import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization, "this is not at all possible dummy")
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;



        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
            req.role = decodedData?.role; // Set user role
            console.log(req.role, "somewhere in the middle of the jungle dummy")
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.id;
        }
        

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;