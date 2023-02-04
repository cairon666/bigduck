import {OptionalObjectSchema} from "yup/lib/object";

export type orderTypes = "ASC" | "DESC"
export type orderList<T> = Record<keyof T, orderTypes>

export class Order<T> {
    private orders: orderList<T>

    constructor() {
        this.orders = {} as orderList<T>
    }

    setOrder(name: keyof T, type: orderTypes) {
        this.orders[name] = type
    }

    getOrders(): orderList<T> {
        return this.orders
    }
}

export declare class Filter<T> {
    public addField(key: string, value: unknown): void;
    public getFields(): T;
}

export declare class DTO {
    public isValid(): void;
}
