import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceMultipleseCase {
    execute(url: string): Promise<boolean>
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleseCase {

    private fileName: string = 'check-service.ts';
    constructor(
        private readonly successCallBack: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly LogRepository: LogRepository[],
    ) {

    }


    private callLogs(log: LogEntity) {
        this.LogRepository.forEach(repo => repo.saveLog(log));
    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(
                {
                    message: `service ${url} working`,
                    level: LogSeverityLevel.low,
                    origin: this.fileName
                });
            this.callLogs(log);

            this.successCallBack && this.successCallBack();
            return true;
        } catch (error) {

            const errorMsg = `${url} is not ok, error:${error}`;
            const log = new LogEntity({ message: errorMsg, level: LogSeverityLevel.high, origin: this.fileName });
            this.callLogs(log);
            this.errorCallback && this.errorCallback(errorMsg);
            return false;
        }

    }

}