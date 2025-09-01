import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { Html } from 'next/document';

export const sendEmail = async({email, emailType, userId} : any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });


        const mailOptions = {
            from: 'auth@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
           html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY"? "verifyemail" : "changepassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}