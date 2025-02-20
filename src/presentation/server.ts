import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImp } from "../Infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "../Infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-mail-logs";
import { MongoLogDataSource } from "../Infrastructure/datasources/mongo.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";


const logRepository = new LogRepositoryImp(
    // new FileSystemDataSource(),
    new MongoLogDataSource()
);


const emailService = new EmailService();

export class ServerApp {


    static async Start() {

        console.log('Server started...');



        const url = 'http://localhost:3000/';
        CronService.createjob(
            '*/10 * * * * *',
            () => {
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                    logRepository,
                ).execute(url);
            });
        const logs = await logRepository.getLogs(LogSeverityLevel.high);
        console.log(logs);
        // new SendEmailLogs(emailService, logRepository).execute('michelelanza07@gmail.com');
       
        // const emailService = new EmailService();
        // emailService.sendEmailWithAttachmentsFileSystem('michelelanza07@gmail.com');
    }

}

