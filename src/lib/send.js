const nodemailer = require("nodemailer");

const BASE_URL = 'https://email-app-advaita.azurewebsites.net/';
export async function sendEMail({ appDataResult, emailDataResult, receiver_data}) {
   // const smtpData = { secure: false, auth: {}, tls: { rejectUnauthorized: false }, connectionTimeout: 6000, logger: true, debug: true };
    const smtpData = { secure: false, auth: {}, tls: { rejectUnauthorized: false }, connectionTimeout: 6000 };
    // smtpData.host = appDataResult['smtp_host'];
    // smtpData.port = appDataResult['smtp_port'];
    // smtpData.auth.user = appDataResult['email'];
    // smtpData.auth.pass = appDataResult['smtp_password'];

    smtpData.host = 'mail.advaita.site';
    smtpData.port = '587';
    smtpData.auth.user = 'email-app@advaita.site';
    smtpData.auth.pass = '^~.}NeO^yfMr';
    
    const trackingUrl = `api/v1/trackemail`;
    const transporter = nodemailer.createTransport(smtpData);
    let template = emailDataResult['template'];
    console.log(template)
    console.log(receiver_data)
    template = template.replace(/{{firstName}}/g, receiver_data['firstName'] ? receiver_data['firstName'] : '');
    template = template.replace(/{{lastName}}/g,  receiver_data['lastName'] ? receiver_data['lastName'] : '');
    template = template.replace(/{{mobileNumber}}/g,  receiver_data['phoneNumber'] ? receiver_data['phoneNumber'] : '');
    template = template.replace(/{{orgName}}/g,  receiver_data['organization_name'] ? receiver_data['organization_name'] : '');
    template = template.replace(/{{email}}/g,  receiver_data['email'] ? receiver_data['email'] : '');
    template = template.replace(/{{senderName}}/g, appDataResult['sender_name'] ? appDataResult['sender_name'] : '');
    template = template.replace(/{{senderCompany}}/g, appDataResult['sender_company'] ? appDataResult['sender_company'] : '');
    template = `<html><style> .tracking-pixel { display: block; width: 1px; height: 1px; overflow: hidden;}</style>
        <body><img src="${BASE_URL}${trackingUrl}" style="display:none;" />${template} </body></html>`;
    const mailOptions = {
        from: emailDataResult['mail_from'],
        to: receiver_data['email'],
        subject: emailDataResult['subject'],
        html: template
    };
    console.log('mailOptions')
    console.log(smtpData)
    console.log(mailOptions)
    return await transporter.sendMail(mailOptions);
}