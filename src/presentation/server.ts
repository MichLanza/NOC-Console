import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImp } from "../Infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "../Infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-mail-logs";


const FileSystemLogRepository = new LogRepositoryImp(
    new FileSystemDataSource()
);


const emailService = new EmailService();

export class ServerApp {


    static Start() {

        console.log('Server started...');



        const url = 'http://localhost:3000/';
        CronService.createjob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                    FileSystemLogRepository,
                ).execute(url);
            });

        new SendEmailLogs(emailService, FileSystemLogRepository).execute('michelelanza07@gmail.com')
        // const emailService = new EmailService();
        // emailService.sendEmailWithAttachmentsFileSystem('michelelanza07@gmail.com');
    }

}

