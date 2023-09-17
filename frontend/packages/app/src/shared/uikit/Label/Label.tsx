import { ReactNode } from 'react';

export interface LabelProps {
    children?: ReactNode;
    required?: boolean;
}

export function Label({ children, required }: LabelProps) {
    return children ? (
        <p className="mb-1 text-sm leading-3 text-gray-600">
            {children}
            {required && <span className="text-red-800">*</span>}
        </p>
    ) : null;
}
