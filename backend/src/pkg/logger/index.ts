import {Logger as WinstonLogger} from "winston";


export class Logger {
    private l: WinstonLogger

    constructor(l: WinstonLogger) {
        this.l = l
    }

    public error(infoObject: object): void {
        this.l.error(infoObject)
    }

    public warn(infoObject: object): void {
        this.l.warn(infoObject)
    }

    public info(infoObject: object): void {
        this.l.info(infoObject)
    }

    public debug(infoObject: object): void {
        this.l.debug(infoObject)
    }
}