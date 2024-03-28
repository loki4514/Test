import jwt from 'jsonwebtoken'






const authMiddleware1 = async (req,res,next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500


        let decodedData;

        if (token && isCustomAuth) {
            
            // this for jwt token 
            decodedData = jwt.verify(token,'test')
            req.userId = decodedData?.email
            req.role = decodedData?.role
            if(req.role === 'admin') {

            }
        } else {
            console.log("i'm insdie the token of googleauth")
            decodedData = jwt.decode(token)
            req.userId = decodedData?.email



        }
        if (req.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
        next()


    } catch (error) {
        console.log(error)

    }
}


export default authMiddleware1