import { Resend } from "resend";
import { otpEmailTemplate } from "../emailTemplates/otpEmailTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY)
const senderEmail = `zentra@${process.env.RESEND_DOMAIN}`;

export async function sendVerificationEmail(userEmail, userName, otp) {
    try {
        const response = await resend.emails.send({
            from: senderEmail,
            to: userEmail,
            subject: "Verify your Zentra account",
            html: otpEmailTemplate(otp, userName)
        });
        if(!response.data) throw error;
        return {success: true, message: "Verification mail send successfully"};
    } catch (error) {
        return {success: false, message: "Failed to send Verification mail"};
    }
}