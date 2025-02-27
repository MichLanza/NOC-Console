import { CronService } from './cron-service';



describe('CronService', () => {

  const mockTick = jest.fn();

  //jest.clearAllMocks si hay mas de una


  test('should create a job',(done) => {

    const job = CronService.createjob('* * * * * *', mockTick );

    setTimeout(() => {
      expect( mockTick ).toBeCalledTimes(2);
      job.stop();
      done();
    }, 2000);


  })


})