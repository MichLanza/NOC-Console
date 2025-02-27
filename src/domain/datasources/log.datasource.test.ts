
import mongoose from 'mongoose';
import { MongoDatabase } from '../../data/mongodb';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { SeverityLevel } from '@prisma/client';
import { LogDataSource } from './log.datasource';
import exp from 'constants';

describe('log.datasource.ts LogDataSource', () => {

    const newLog = new LogEntity({
        origin: 'test DataSOurce',
        message: 'Test message',
        level: LogSeverityLevel.low,
    });

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }


    test('shoul test the abstract class', async () => {
        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(typeof mockLogDataSource.saveLog).toBe('function');
        expect(typeof mockLogDataSource.getLogs).toBe('function');
        await mockLogDataSource.saveLog(newLog);
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity)
    });



});

