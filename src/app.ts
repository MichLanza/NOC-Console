import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server";
import 'dotenv/config';

(async () => {
    await main();
})();



async function main() {
    // console.log(envs.PORT);
    ServerApp.Start();

}