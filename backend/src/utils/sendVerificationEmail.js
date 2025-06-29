import { resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(email, name, verifyCode) {
    try {
        await resend.emails.send({
            from: 'zentra@resend.dev',
            to: email,
            subject: 'Mystery Message Verification Code',
            react: VerificationEmail({ name, otp: verifyCode }),
        });
        return {success: true, message: "Verification mail send successfully"};
    } catch (error) {
        return {success: false, message: "Failed to send Verification mail"};
    }
}