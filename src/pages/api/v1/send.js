const nodemailer = require("nodemailer");

const BASE_URL = 'http://localhost:3000';

export async function sendEMail(smtpData, emailData, prospects, senderName) {
    const transporter = nodemailer.createTransport(smtpData);
    let template = emailData['template'];
    const receiver_data = JSON.parse(prospects[i]['receiver_data']);
    const trackingUrl = `${BASE_URL}/api/v1/trackemail?state=${prospects['id']}`
    template = template.replace(/{{firstName}}/g, receiver_data['firstName'])
    template = template.replace(/{{senderName}}/g, senderName);
    template = `<html><style> .tracking-pixel { display: block; width: 1px; height: 1px; overflow: hidden;}</style>
    <body><img src="${trackingUrl}" style="display:none;" />
    ${template} </body></html>`
    const mailOptions = {
        from: emailData['mail_from'],
        to: receiver_data['label'],
        subject: emailData['subject'],
        html: template
    };
    return await transporter.sendMail(mailOptions);

}