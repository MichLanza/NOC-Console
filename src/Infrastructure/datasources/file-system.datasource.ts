import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import *as fs from 'fs';

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs-Folder/'
    private readonly allLogPath = 'logs-Folder/logs-low.log'
    private readonly mediumLogPath = 'logs-Folder/logs-medium.log'
    private readonly highLogPath = 'logs-Folder/logs-high.log'


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath,
        ].forEach(path => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogPath, logAsJson);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogPath, logAsJson);
        }

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:

                return this.getLogsFromFile(this.allLogPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogPath);
            default:
                throw new Error('Severity level not implemented');
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {

        const content = fs.readFileSync(path, 'utf-8');
        if (content === '') return [];  
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );
        // const logs = content.split('\n').map(LogEntity.fromJson);
        return logs;
    }


}