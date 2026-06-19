const contactUsEmailTemplate = (name, email, subject, message) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding: 30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:550px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#000000; padding:24px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px; letter-spacing:1.5px; font-weight:700;">ZENTRA SUPPORT</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 24px;">
              <h2 style="color:#111827; font-size:18px; margin-top:0; border-bottom:1px solid #f3f4f6; padding-bottom:12px;">New Contact Inquiry</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px; margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0; color:#6b7280; font-size:13px; width:100px; font-weight:600;">Sender Name:</td>
                  <td style="padding:6px 0; color:#111827; font-size:14px; font-weight:500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#6b7280; font-size:13px; font-weight:600;">Email Address:</td>
                  <td style="padding:6px 0; color:#111827; font-size:14px; font-weight:500;"><a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#6b7280; font-size:13px; font-weight:600;">Subject:</td>
                  <td style="padding:6px 0; color:#111827; font-size:14px; font-weight:500;">${subject}</td>
                </tr>
              </table>

              <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:20px; color:#374151; font-size:14px; line-height:1.6; white-space:pre-wrap;">
                ${message}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:20px 24px; text-align:center; border-t:1px solid #f3f4f6;">
              <p style="color:#9ca3af; font-size:11px; margin:0; line-height:1.4;">
                This email was auto-generated from Zentra Contact Us form.<br/>
                &copy; ${new Date().getFullYear()} Zentra. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export { contactUsEmailTemplate };
