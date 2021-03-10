import { createConnection, getConnection } from "typeorm";
import { Form } from "../DB/Entities/Forms.Entity";
import { CreateFormsTable1615288284381 } from "../DB/Migration/1615288284381-CreateFormsTable";

const connect = async () => {
    let connection = await createConnection({
        database: "forms",
        driver: require('expo-sqlite'),
        entities: [
            Form
        ],
        //If you're not using migrations, you can delete these lines,
        //since the default is no migrations:
        migrations: [CreateFormsTable1615288284381],
        migrationsRun: true,

        // If you're not using migrations also set this to true
        synchronize: false,
        type: "expo"
    }).then(() => console.log('connection success')).catch(e => console.log(e));
    return connection;
}


export default connect