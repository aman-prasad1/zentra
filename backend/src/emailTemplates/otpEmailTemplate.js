const otpEmailTemplate = (otp, userName = "User") => `
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
        <table role="presentation" width="100%" style="max-width:480px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4f46e5; padding:24px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px; letter-spacing:1px;">Zentra</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 24px;">
              <h2 style="color:#1f2937; font-size:20px; margin-top:0;">Verify Your Email</h2>
              <p style="color:#4b5563; font-size:15px; line-height:1.6;">
                Hi ${userName}, thanks for signing up on Zentra. Use the OTP below to verify your account. This code is valid for <strong>3 minutes</strong>.
              </p>

              <div style="text-align:center; margin:32px 0;">
                <span style="display:inline-block; background-color:#eef2ff; color:#4f46e5; font-size:32px; font-weight:700; letter-spacing:8px; padding:14px 28px; border-radius:8px;">
                  ${otp}
                </span>
              </div>

              <p style="color:#6b7280; font-size:14px; line-height:1.6;">
                If you didn't request this code, you can safely ignore this email. Never share this OTP with anyone, including Zentra staff.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:16px 24px; text-align:center;">
              <p style="color:#9ca3af; font-size:12px; margin:0;">
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

export { otpEmailTemplate };