import mongoose from "mongoose";
import { LogModel, MongoDatabase } from "../../data/mongodb";
import { MongoLogDataSource } from "./mongo.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('MongoDatasource', () => {


    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
    });

    afterAll(async () => {
        mongoose.connection.close();
    });
    afterEach(async () => {
        await LogModel.deleteMany();
    });

    const newLog = new LogEntity({
        origin: 'test DataSOurce',
        message: 'Test message',
        level: LogSeverityLevel.medium,
    });

    const logDataSource = new MongoLogDataSource();

    it('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');
        await logDataSource.saveLog(newLog);
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("", expect.any(String));
    });

    it('should get logs', async () => {

        await logDataSource.saveLog(newLog);
        const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});