import { CronJob } from 'cron';

type Crontime = string | Date;
type OnTick = () => void;


export class CronSerive {

    static createjob(cronTime: Crontime, onTick : OnTick): CronJob {

        const job = new CronJob(
           cronTime, // cronTime
           onTick, // onTick
            null, // onComplete                       
        );
        job.start();

        return job;
    }


}