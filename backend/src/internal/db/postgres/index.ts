import { Config } from '../../config';
import { CredentialDB } from './credential.models';
import { DataSource } from 'typeorm';
import { UserDB } from './user.models';
import { Quizzes } from './quizzes.models';
import { Question } from './questions.models';

export async function NewDataSource(conf: Config): Promise<DataSource> {
    const AppDataSource = new DataSource({
        type: 'postgres',
        host: conf.POSTGRES.HOST,
        port: Number(conf.POSTGRES.PORT),
        username: conf.POSTGRES.USER,
        password: conf.POSTGRES.PASSWORD,
        database: conf.POSTGRES.DATABASE,
        logging: conf.APP.DEBUG,
        entities: [CredentialDB, UserDB, Quizzes, Question],
        subscribers: [],
        migrations: [],
        poolSize: 5,
    });

    return await AppDataSource.initialize();
}
