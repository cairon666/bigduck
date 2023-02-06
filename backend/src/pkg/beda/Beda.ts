export class Beda extends Error {
    private readonly title: string;
    private readonly code: number;
    private readonly details: string[];

    constructor(title: string, code: number) {
        super(title);

        // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.russian.md
        Object.setPrototypeOf(this, new.target.prototype); // восстанавливаем цепочку прототипов

        this.title = title;
        this.code = code;
        this.details = [];

        Error.captureStackTrace(this);
    }

    addDesc(detail: string) {
        this.details.push(detail);
    }

    getTitle(): string {
        return this.title;
    }

    getDesc(): string[] {
        return this.details;
    }

    getCode(): number {
        return this.code;
    }

    isEmpty(): boolean {
        return !this.details.length;
    }
}
