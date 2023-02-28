import { sign, verify } from 'jsonwebtoken';
import { v4 } from 'uuid';

const SecretKey = 'secret';

export interface AuthenticationService {
    New(id: string): Promise<{ access: string; refresh: string }>;

    Update(refresh: string): Promise<{ access: string; refresh: string }>;

    Clear(access: string, refresh: string): Promise<void>;
}

export class AuthenticationProvider implements AuthenticationService {
    public async New(id: string): Promise<{ access: string; refresh: string }> {
        return {
            access: AuthenticationProvider.generateAccessToken(id),
            refresh: AuthenticationProvider.generateRefreshToken(id),
        };
    }

    public async Update(
        refresh: string,
    ): Promise<{ access: string; refresh: string }> {
        const decoded = verify(refresh, SecretKey, {
            complete: true,
        });

        if (
            typeof decoded.payload === 'string' ||
            decoded.payload.id === undefined
        ) {
            throw new Error('bad refresh token');
        }

        return {
            access: AuthenticationProvider.generateAccessToken(
                decoded.payload.id,
            ),
            refresh: refresh,
        };
    }

    public async Clear(access: string, refresh: string): Promise<void> {
        return;
    }

    private static generateRefreshToken(id: string): string {
        return sign(
            {
                id: id,
            },
            SecretKey,
            {
                expiresIn: '30d',
                jwtid: v4(),
            },
        );
    }

    private static generateAccessToken(id: string): string {
        return sign(
            {
                id: id,
            },
            SecretKey,
            {
                expiresIn: '1h',
                jwtid: v4(),
            },
        );
    }
}
