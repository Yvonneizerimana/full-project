import registerUserModel from "../models/registerUser.model.js";
import jwt from "jsonwebtoken";

const registering = async (req, res, next) => {
    const tokenn = req.cookies.token;
    try {
        if (!tokenn) {
            return res.status(401).json({ success: false, message: "Access token not found" });
        }

        try {
            const payload = jwt.verify(tokenn, process.env.ACCESS_TOKEN_SECRET); 
            const email = payload.email;

            const user = await registerUserModel.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.role !== "admin") {
                return res.status(403).json({ success: false, message: "Access denied" });
            }

    
            res.status(200).json({ success: true, message: "Access granted" });
            
        } catch (error) {
            console.log(error.message);
            return res.status(401).json({ success: false, message: "Invalid access token" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default registering;
