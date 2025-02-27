import { MongoDatabase } from "./init";
import mongoose from 'mongoose';

describe ('MongoDB init', () => {

    afterAll(async() => {
        mongoose.connection.close();
    });
    
    test('should connect to MongoDb', async() => {
        const connected = MongoDatabase.connect({
               mongoUrl: process.env.MONGO_URL!,
               dbName: process.env.MONGO_DB_NAME!
           });

           expect(connected).toBe(true);
    });

    test('should throw an error', async() => {
      try {
          const connected = MongoDatabase.connect({
                 mongoUrl: process.env.MONGO_URL!,
                 dbName: process.env.MONGO_DB_NAME + 'error' 
             });
  
             expect(true).toBe(false);
      } catch (error) {
        
      }
    });
});