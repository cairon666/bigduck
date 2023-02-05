import {Config} from "../../config";
import {Credential} from "./credential.models";
import {DataSource} from "typeorm";
import {User} from "./user.models";

export async function NewDataSource(conf: Config): Promise<DataSource> {
    const AppDataSource = new DataSource({
        type: "postgres",
        host: conf.POSTGRES.HOST,
        port: Number(conf.POSTGRES.PORT),
        username: conf.POSTGRES.USER,
        password: conf.POSTGRES.PASSWORD,
        database: conf.POSTGRES.DATABASE,
        logging: conf.APP.DEBUG,
        entities: [
            Credential,
            User,
        ],
        subscribers: [],
        migrations: [],
        poolSize: 20,
    })


    return await AppDataSource.initialize()
}
