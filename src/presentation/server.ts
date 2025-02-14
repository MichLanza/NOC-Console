import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronSerive } from "./cron/cron-service";
import { LogRepositoryImp } from "../Infrastructure/repositories/log.repository";
import { FileSystemDataSource } from "../Infrastructure/datasources/file-system.datasource";


const FileSystemLogRepository = new LogRepositoryImp(
    new FileSystemDataSource()
);

export class ServerApp {


    static Start() {

        console.log('Server started...');
        const url = 'http://localhost:3000/';
        CronSerive.createjob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                    FileSystemLogRepository,
                ).execute(url);
            });
    }

}

