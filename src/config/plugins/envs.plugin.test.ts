import { envs } from "./envs.plugin";

describe('envs.plugin', () => {

    it('should retun env options', () => {
       expect(envs).toEqual({

       });
    });

       it('should retun error if not found env', async () => {
      
        jest.resetModules();
        process.env.Prot = 'ABC';
      
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be valid integer');
        }
  
    });
});