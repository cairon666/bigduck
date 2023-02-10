export class Beda extends Error {
    private readonly title: string;
    private readonly code: number;
    private readonly details: unknown[];

    public constructor(title: string, code: number) {
        super(title);

        // https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.russian.md
        Object.setPrototypeOf(this, new.target.prototype); // восстанавливаем цепочку прототипов

        this.title = title;
        this.code = code;
        this.details = [];

        Error.captureStackTrace(this);
    }

    public addDesc(detail: unknown) {
        this.details.push(detail);
    }

    public getTitle(): string {
        return this.title;
    }

    public getDesc(): unknown[] {
        return this.details;
    }

    public getCode(): number {
        return this.code;
    }

    public isEmpty(): boolean {
        return !this.details.length;
    }
}
