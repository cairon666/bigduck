import {DataSource} from "typeorm";
import {IConfig} from "../../config";
import {Credential, User} from "./entities";

export async function createDataSource(config: IConfig): Promise<DataSource> {
    const AppDataSource = new DataSource({
        type: "postgres",
        url: config.POSTGRES_URL,
        synchronize: false,
        entities: [
            Credential,
            User
        ],
        logging: config.APP_DEBUG,
    })

    await AppDataSource.initialize()

    return AppDataSource;
}
