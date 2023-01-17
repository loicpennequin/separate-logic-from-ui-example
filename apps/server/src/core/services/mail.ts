import nodemailer from 'nodemailer';
import { config } from '../../config';

const getTransport = () => {
  return nodemailer.createTransport({
    host: config.SMTP.HOST,
    port: config.SMTP.PORT,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });
};

export type SendMailOptions = {
  to: string;
  template: {
    subject: string;
    body: string;
  };
};

export const mailerService = {
  sendMail({ to, template }: SendMailOptions) {
    const transporter = getTransport();
    return transporter
      .sendMail({
        from: 'my-app@gmail.com',
        to,
        subject: template.subject,
        html: template.body
      })
      .then(result => {
        console.log('mail sent', result);
      });
  }
};
