const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "devops.mailbox1@gmail.com",
        pass: "imam spxl asji nahe",
    },
});
let templete1 = `<div style={{ color: "#000000", fontFamily: 'Arial, sans-serif' }}>

<table style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderCollapse: 'collapse' }}>
    <tr>
        <td style={{ textAlign: 'center', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img
                width={225}
                height={50}
                src={"/images/logo-no-background.png"}
                alt="Logo"
            />
        </td>
    </tr>
    <tr>
        <td>
            <p>Hello {username},</p>
            <p style={{ lineHeight: 2, marginTop: '0.5rem' }}>We are thrilled to have you join our community. Thank you for signing up.</p>
            <p style={{ lineHeight: 2 }}> {message}  </p>
        </td>
    </tr>
    <tr>
        <td>
            <p style={{ marginTop: '1rem' }}>Best regards,<br />The Team</p>
        </td>
    </tr>
</table>

<footer style={{ textAlign: 'center' }}>

    <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        This email was sent to <a href="#" style={{ color: 'rgb(37 99 235)' }} target="_blank">contact@email-app.com</a>.
        If you'd rather not receive this kind of email, you can <a href="#" style={{ color: 'rgb(37 99 235)' }}>unsubscribe</a> or <a href="#" style={{ color: 'rgb(37 99 235)' }}>manage your email preferences</a>.
    </p>

    <p style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderCollapse: 'collapse' }}>© 2024 Email app. All Rights Reserved.</p>
</footer>
</div>
`

export default function handler(req, res) {
    let html = templete1;
    html = html.replace('{message}', req.body.message)
    const mailOptions = {
        from: req.body.from, //'manish.mailbox94@gmail.com',
        to:  req.body.to, //'devops.mailbox1@gmail.com',
        subject: "Test", // Subject line
        html: html
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(200).json({ message: "Failed to send email" });
        } else {
            res.status(200).json({ name: "Email sent successfully!" });
        }
    });
}