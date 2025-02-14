import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogDataSource } from '../../domain/datasources/log.datasource';
export class LogRepositoryImp implements LogRepository {


    constructor(
        private readonly datasource: LogDataSource
    ) { }

    async saveLog(log: LogEntity): Promise<void> {
        return this.datasource.saveLog(log);
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.datasource.getLogs(severityLevel);
    }

} 