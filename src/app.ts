import { PrismaClient } from '@prisma/client';
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb";
import { ServerApp } from "./presentation/server";

(async () => {
    await main();
})();



async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const prisma = new PrismaClient();

    // const newLog = await prisma.log.create({
    //     data: {
    //         level: 'MEDIUM',
    //         message: 'test message',
    //         origin: 'App.ts'
    //     }
    // });

    // console.log(newLog);

    // const logs = await prisma.log.findMany({ where: { level: 'MEDIUM' } });

    // console.log(logs);
    ServerApp.Start();

}



