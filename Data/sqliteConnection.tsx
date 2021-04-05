import { ConnectionOptions, createConnection, getConnection } from "typeorm";
import { AssetResult } from "../DB/Entities/AssetResult.Entity";
import { Form } from "../DB/Entities/Forms.Entity";
import { CreateFormsTable1615288284381 } from "../DB/Migration/1615288284381-CreateFormsTable";

const connect = async () => {
    const options: ConnectionOptions = {
        name: 'default',
        database: "forms",
        driver: require('expo-sqlite'),
        entities: [
            Form, AssetResult
        ],
        //If you're not using migrations, you can delete these lines,
        //since the default is no migrations:
        migrations: [CreateFormsTable1615288284381],
        migrationsRun: false,

        // If you're not using migrations also set this to true
        synchronize: false,
        type: "expo"
    };
    try {
        await getConnection(options.name).close();
        return createConnection(options);
    } catch (error) {
        return createConnection(options);
    }
}


export default connect