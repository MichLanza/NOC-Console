import { SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log entity', () => {

    const dataObj = {
        message: 'Hola',
        level: LogSeverityLevel.high,
        origin: 'log entity test'
    }
    test('should create a LogEntity instance', () => {

       
        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    
    test('should create a LogEntity from json', () => {
        const json = `{"message":"service http://localhost:3000/ working","level":"low","createdAt":"2025-02-20T01:07:00.130Z","origin":"check-service.ts"}`
        const log = LogEntity.fromJson(json);
    
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("service http://localhost:3000/ working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    test('should create a LogEntity from object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });


});