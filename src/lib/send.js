const nodemailer = require("nodemailer");

const BASE_URL = 'https://email-app-advaita.azurewebsites.net/';

export async function sendEMail({ smtpData, emailData, trackingUrl, firstName = '', senderName = '', mail_from, receiver_data }) {
    const transporter = nodemailer.createTransport(smtpData);
    let template = emailData['template'];
    template = template.replace(/{{firstName}}/g, firstName)
    template = template.replace(/{{senderName}}/g, senderName);
    if (trackingUrl) {
        template = `<html><style> .tracking-pixel { display: block; width: 1px; height: 1px; overflow: hidden;}</style>
        <body><img src="${BASE_URL}/${trackingUrl}" style="display:none;" />
        ${template} </body></html>`
    }
    const mailOptions = {
        from: mail_from,
        to: receiver_data,
        subject: emailData['subject'],
        html: template
    };
    return await transporter.sendMail(mailOptions);
}