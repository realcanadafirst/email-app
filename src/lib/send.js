const nodemailer = require("nodemailer");

const BASE_URL = 'https://email-app-advaita.azurewebsites.net/';

export async function sendEMail({ smtpData, emailData, trackingUrl, firstName = '', lastName= '', senderName = '', senderCompany = '', mail_from, receiver_data, mobileNumber='', orgName= '', email='' }) {
    const transporter = nodemailer.createTransport(smtpData);
    let template = emailData['template'];
    template = template.replace(/{{firstName}}/g, firstName)
    template = template.replace(/{{lastName}}/g, lastName)
    template = template.replace(/{{senderName}}/g, senderName);
    template = template.replace(/{{senderCompany}}/g, senderCompany);
    template = template.replace(/{{mobileNumber}}/g, mobileNumber);
    template = template.replace(/{{orgName}}/g, orgName);
    template = template.replace(/{{email}}/g, email);
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
    console.log('mailOptions')
    console.log(mailOptions)
    console.log(smtpData)
    return await transporter.sendMail(mailOptions);
}