import { ConnectionOptions, createConnection, getConnection } from "typeorm/browser";
import { AssetResult } from "../DB/Entities/AssetResult.Entity";
import { Form } from "../DB/Entities/Forms.Entity";
const connect = async () => {
  const options: ConnectionOptions = {
    database: "agentsAppDB9801",
    driver: require('expo-sqlite'),
    entities: [
        Form,
        AssetResult,
    ],
    synchronize: true,
    type: "expo",
  };
  try {
    await getConnection(options.name).close();
    return await createConnection(options);
  } catch (error) {
    return await createConnection(options);
  }
};

export default connect;
