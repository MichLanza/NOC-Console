import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('CheckService', () => {


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const mocksRepos = [mockRepository, mockRepository2, mockRepository3,]

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        successCallback,
        errorCallback,
        mocksRepos,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call success callback when true', async () => {

        const wasok = await checkService.execute('https://google.com');
        expect(wasok).toBe(true);

        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

    it('should call error callback when false', async () => {

        const wasok = await checkService.execute('https://godasdasdasogle.com');
        expect(wasok).toBe(false);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });


});