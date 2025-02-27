import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('CheckService', () => {


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        successCallback,
        errorCallback,
        mockRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call success callback when true', async () => {

        const wasok = await checkService.execute('https://google.com');
        expect(wasok).toBe(true);

        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

    it('should call error callback when false', async () => {

        const wasok = await checkService.execute('https://godasdasdasogle.com');
        expect(wasok).toBe(false);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });


});