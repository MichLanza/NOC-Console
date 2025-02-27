import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-mail-logs";

describe('send-mail-logs', () => {

    const mockEmailService = {
        sendEmailWithAttachmentsFileSystem: jest.fn().mockReturnValue(true),
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendEmails = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should send an email', async () => {

       
        const sent = await sendEmails.execute('michelelanza07@gmail.com');

        expect(sent).toBe(true);
        expect(mockEmailService.sendEmailWithAttachmentsFileSystem).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        
    });

    it('should LOG on error', async () => {

        mockEmailService.sendEmailWithAttachmentsFileSystem.mockResolvedValue(false);
        const sent = await sendEmails.execute('michelelanza07@gmail.com');

        expect(sent).toBe(false);
        expect(mockEmailService.sendEmailWithAttachmentsFileSystem).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        
    });

});