import mongoose from 'mongoose';
import { MongoDatabase } from './../init';
import { LogModel } from './log.model';
describe('log.model.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should return log model', async () => {

        const logData = {
            origin: 'log.model.test.ts',
            message: 'ttest-message',
            level: 'low'
        }
        const log = await LogModel.create(logData);
        expect(log).toEqual(expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date)
        }));

        await LogModel.findByIdAndDelete(log.id);


    });

    test('should return schema', async () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: { type: expect.any(Function), enum: ['low', 'medium', 'high'], default: 'low' },
            cretedAt: expect.any(Object)
        }));

    });

});