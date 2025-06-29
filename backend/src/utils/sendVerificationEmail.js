import { Resend } from "resend";

export async function sendVerificationEmail(email, name, verifyCode) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const response = await resend.emails.send({
            from: 'zentra@resend.dev',
            to: email,
            subject: 'Zentra Verification Code',
            html: `<strong>Hii ${name}. Your verification code: ${verifyCode}</strong>`,
        });
        if(!response.data) throw error;
        return {success: true, message: "Verification mail send successfully"};
    } catch (error) {
        return {success: false, message: "Failed to send Verification mail"};
    }
}