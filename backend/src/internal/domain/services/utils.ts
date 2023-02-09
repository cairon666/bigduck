import { BaseSchema, ValidationError } from 'yup';
import { Beda } from '../../../pkg/beda/Beda';
import { CodeError, Exceptions } from '../exceptions/exceptions';

export function isValid(scheme: BaseSchema, obj: unknown) {
    try {
        scheme.validateSync(obj, { abortEarly: false });
    } catch (e) {
        const err = new Beda(Exceptions.Validate, CodeError.Valid);
        if (e instanceof ValidationError) {
            e.errors.forEach((error) => {
                err.addDesc(error);
            });
        }
        throw err;
    }
}

export type OrderType = 'DESC' | 'ASC';
export type getOrder<T extends string | number | symbol> = Partial<
    Record<T, OrderType>
>;
