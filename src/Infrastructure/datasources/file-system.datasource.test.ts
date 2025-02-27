import fs from "fs";
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { log } from "console";
import { FileSystemDataSource } from "./file-system.datasource";

describe('FileSystem', () => {

    const newLog = new LogEntity({
        origin: 'test DataSOurce',
        message: 'Test message',
        level: LogSeverityLevel.medium,
    });

    const logPath = path.join(__dirname, '../../../logs-Folder');
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    })

    it('should create a log if they not exists', async () => {
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-low.log', 'logs-medium.log', 'logs-high.log']);
    });

    it('should create a log in all logs file', async () => {
        const logDataSource = new FileSystemDataSource();
        logDataSource.saveLog(newLog);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));

    });
    it('should create a log in all logs file and medium', async () => {
        const logDataSource = new FileSystemDataSource();
        newLog.level = LogSeverityLevel.medium;
        logDataSource.saveLog(newLog);
        const allLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));

    });

    it('should create a log in all logs file and high', async () => {
        const logDataSource = new FileSystemDataSource();
        newLog.level = LogSeverityLevel.high;
        logDataSource.saveLog(newLog);
        const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));

    });

    it('should return all logs', async () => {
        const logDataSource = new FileSystemDataSource();
        logDataSource.saveLog(newLog);
        const logLow = await logDataSource.getLogs(LogSeverityLevel.low);
        const logMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
        const logHigh = await logDataSource.getLogs(LogSeverityLevel.high);
        expect(logLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logHigh).toEqual(expect.arrayContaining([logHigh]));
    });

    it('should return and error if path exists', async () => {
        new FileSystemDataSource();
        new FileSystemDataSource();
        expect(true).toBeTruthy();
    });

    it('should return and error if severity is not  defined', async () => {
        const logDataSource = new FileSystemDataSource();
        const customLevel = 'NOSOY' as LogSeverityLevel;

        try {
            await logDataSource.getLogs(customLevel);
            expect(false).toBeFalsy();
        } catch (error) {
            expect(`${error}`).toContain(customLevel + ' not implemented')
        }

    });


});