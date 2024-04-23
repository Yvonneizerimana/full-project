import registerUserModel from "../models/registerUser.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail'

const sendgridKey=''

sgMail.setApiKey(sendgridKey);

const mailer = async (mailOptions, action) => {
  try {
    await sgMail.send(mailOptions);
    console.log('Sent mail');
  } catch (err) {
    console.error(err, 'error yange shaaaaaaaaaaaaaa');
  }
};

const user = {
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email as username and password');
      }

      const user = await registerUserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }
      if (user && passwordValid) {
        const accessToken = jwt.sign({
          email: user.email,
          id: user._id
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3h" });

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        };
        res.status(200).cookie("token", accessToken, options).json({ user: user.firstName + user.lastName });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  },

  forgotPassword: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await registerUserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      function generateRandomToken() {
        return crypto.randomBytes(20).toString('hex');
      }
      const resetToken = generateRandomToken();
      user.resetToken = resetToken;
      user.resetTokenExpires = Date.now() + 10 * 60 * 1000;
      await user.save();

      const mailoptions = {
        from: 'dimitrikwihangana@gmail.com', // sender address
        to: req.body.email, // receiver address
        subject: 'Hello ✔', // Subject line
        html: `http://localhost:4000/autho/reset-password/${resetToken}`
      };

      await mailer(mailoptions, "updatePassword");
      res.status(200).send("Password reset email sent successfully");
    } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).send('Internal server error');
    }
  },


  resetPassword: async (req, res) => {
    const token  = req.params.resetToken;
    try{
      const user = await registerUserModel.findOne({ resetToken: token });

      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Check if token is expired
      if (user.resetTokenExpires < Date.now()) {
          return res.status(400).json({ message: 'Token has expired' });
      }
if(token===user.resetToken){
  res.render("welcome",{email:user.email});
}

else{
  return res.json({ message: 'Invalid token' });
}
} 
catch (error) {
console.error('Error resetting password:', error);
return res.status(500).json({ message: 'Internal server error' });
}

    
  },



 // Route to handle resetting password
changePassword: async (req, res) => {
  const token  = req.params.resetToken;
  

  try {
      // Find user by reset token
      const user = await registerUserModel.findOne({ resetToken: token });

      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Check if token is expired
      if (user.resetTokenExpires < Date.now()) {
          return res.status(400).json({ message: 'Token has expired' });
      }
if(token===user.resetToken) {
  const { newPassword, confirmPassword } = req.body;
      // Check if passwords match
      if (newPassword !== confirmPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
      }

      // Update user's password
      user.password = newPassword;
      user.confirmPassword = confirmPassword;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();

      return res.status(200).json({ message: 'Password updated successfully' });}
      else{
        return res.json({ message: 'Invalid token' });
      }
  } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
}
}
export default user;
