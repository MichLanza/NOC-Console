import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronSerive } from "./cron/cron-service";


export class ServerApp {

    static Start() {

        console.log('Server started...');
        const url = 'http://localhost:3000/';
        CronSerive.createjob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () =>  console.log(`${url} is ok`),
                    (error) => console.log(error),
                ).execute(url);
            });
    }

}

