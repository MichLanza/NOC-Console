import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {

    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]
}

interface Attachment {
    filename: string,
    path: string,
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });


   

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;
        try {

            const sendInfo = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            })
            // console.log(sendInfo);
          
            return true;
        } catch (error) {
           
            return false;
        }
    }

    async sendEmailWithAttachmentsFileSystem(to: string | string[]) {

        const subject = 'Logs del servidor';
        const htmlBody = `
               <h3>logs del sistema - NOC</h3>
       <p>ver logs adjuntos</p>
       `
        const attachments: Attachment[] = [
            { filename: 'logs-high.log', path: './logs-Folder/logs-high.log' },
            { filename: 'logs-low.log', path: './logs-Folder/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs-Folder/logs-medium.log' }
        ]
        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }

}