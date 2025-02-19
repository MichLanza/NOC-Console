import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface SendEmailLogUseCase {

    execute: (to: string | string[]) => Promise<boolean>;

}


export class SendEmailLogs implements SendEmailLogUseCase {


    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(to: string | string[]): Promise<boolean> {

        try {

            const sent = await this.emailService.sendEmailWithAttachmentsFileSystem(to);
            if (!sent) {
                throw new Error('Email log not sent');
            }

            return true;

        } catch (error) {

            const log = new LogEntity({
                message : `${error}`,
                level : LogSeverityLevel.high,
                origin : 'send-mail-logs.ts'
            });

            this.logRepository.saveLog(log);

            return false;
        }


    };

}