import {
    createLogger,
    format,
    Logger as WinstonLogger,
    transports,
} from 'winston';

export class Logger {
    private l: WinstonLogger;

    public constructor(l: WinstonLogger) {
        this.l = l;
    }

    public error(infoObject: object): void {
        this.l.error(infoObject);
    }

    public warn(infoObject: object): void {
        this.l.warn(infoObject);
    }

    public info(infoObject: object): void {
        this.l.info(infoObject);
    }

    public debug(infoObject: object): void {
        this.l.debug(infoObject);
    }
}

export function NewDevLogger(): Logger {
    return new Logger(
        createLogger({
            level: 'info',
            format: format.json(),
            defaultMeta: { service: 'backend' },
            transports: [
                new transports.Console({
                    format: format.json(),
                    level: 'debug',
                }),
            ],
        }),
    );
}
