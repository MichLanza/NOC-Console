import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImp } from "../Infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "../Infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-mail-logs";
import { MongoLogDataSource } from "../Infrastructure/datasources/mongo.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresDataSource } from "../Infrastructure/datasources/postgres.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


const logRepository = new LogRepositoryImp(
    // new FileSystemDataSource(),
    // new MongoLogDataSource()
    new PostgresDataSource()
);

const PostgresRepository = new LogRepositoryImp(
    new PostgresDataSource()
);

const FileSystemRepository = new LogRepositoryImp(
    new FileSystemDataSource(),
);

const MongoLogRepo = new LogRepositoryImp(
    new MongoLogDataSource()
);

const Repositories = [PostgresRepository, FileSystemRepository, MongoLogRepo];


const emailService = new EmailService();

export class ServerApp {


    static async Start() {

        console.log('Server started...');
        const url = 'http://localhost:3000/';
        // CronService.createjob(
        //     '*/5 * * * * *',
        //     () => {
        //         new CheckService(
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error),
        //             logRepository,
        //         ).execute(url);
        //     });

        CronService.createjob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                    Repositories,
                ).execute(url);
            });

        const logs = await logRepository.getLogs(LogSeverityLevel.high);
        console.log(logs);



        // new SendEmailLogs(emailService, logRepository).execute('michelelanza07@gmail.com');       
        // const emailService = new EmailService();
        // emailService.sendEmailWithAttachmentsFileSystem('michelelanza07@gmail.com');
    }

}

