export class Beda {
    private title: string
    private descriptions: string[]

    constructor(title: string) {
        this.title = title
        this.descriptions = []
    }

    addDesc(desc: string) {
        this.descriptions.push(desc)
    }

    getTitle(): string {
        return this.title
    }

    getDesc(): string[] {
        return this.descriptions
    }

    isEmpty(): boolean {
        return !this.descriptions.length
    }
}