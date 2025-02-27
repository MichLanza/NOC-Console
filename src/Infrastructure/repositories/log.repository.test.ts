import { mock } from "node:test";
import { LogRepositoryImp } from "./log.repository";
import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('RepoIMplementation', () => {


    const mockDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const repo = new LogRepositoryImp(mockDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should call save log', async () => {

        const log = { level: LogSeverityLevel.low, message: 'test message' } as LogEntity;
        await repo.saveLog(log);
        expect(mockDataSource.saveLog).toHaveBeenCalledWith(log);
    });


    it('should call get log', async () => {
       
        await repo.getLogs(LogSeverityLevel.low);
        expect(mockDataSource.saveLog).toHaveBeenCalledWith(LogSeverityLevel.low);

    });


})