import { startServer } from './server/Server';

const main = async () => {
    console.log('server is starting');

    // testGetUser();
    //const db = await createDB(webConfig.databaseConfiguration.connectionString);
    startServer().then().catch();
};

main().then().catch();
