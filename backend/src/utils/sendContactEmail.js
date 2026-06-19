import { Resend } from "resend";
import { contactUsEmailTemplate } from "../emailTemplates/contactUsEmailTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const senderEmail = `zentra@${process.env.RESEND_DOMAIN}`;

export async function sendContactEmail(name, email, subject, message) {
  try {
    const destinationEmail = `support@${process.env.RESEND_DOMAIN || "amanprasad.xyz"}`;
    const response = await resend.emails.send({
      from: senderEmail,
      to: destinationEmail,
      subject: `Zentra Contact Support: ${subject}`,
      html: contactUsEmailTemplate(name, email, subject, message)
    });
    if (!response.data) throw new Error("Resend error");
    return { success: true, message: "Contact mail sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send contact mail" };
  }
}
