import { AuthService } from './types';
import {
    AuthLoginDTO,
    AuthLoginResponseDTO,
    AuthRefreshDTO,
    AuthRefreshResponseDTO,
    AuthRegisterDTO,
    AuthRegisterResponseDTO,
} from './dto';
import { CredentialModel, UserModel } from '../../models';
import { v4 } from 'uuid';
import { AuthenticationService } from '../../../adapters/authenticationProvider';

export class AuthUsecase {
    public constructor(
        private readonly authService: AuthService,
        private readonly authenticationService: AuthenticationService,
    ) {}

    public async Login(dto: AuthLoginDTO): Promise<AuthLoginResponseDTO> {
        await dto.isValid();

        const password_hash = this.generatePasswordHash(dto.password);

        const resp = await this.authService.ReadByLogin(dto.login);

        if (!resp) {
            throw new Error('not found');
        }

        if (password_hash !== resp.password_hash) {
            throw new Error('bad password');
        }

        const respTokens = await this.authenticationService.New(resp.id);

        return new AuthLoginResponseDTO(
            resp.id,
            respTokens.access,
            respTokens.refresh,
        );
    }

    public async Register(
        dto: AuthRegisterDTO,
    ): Promise<AuthRegisterResponseDTO> {
        await dto.isValid();

        const uuid = v4();
        const password_hash = this.generatePasswordHash(dto.password);
        const now = new Date();

        const credential = new CredentialModel(
            uuid,
            dto.login,
            password_hash,
            dto.email,
        );
        const user = new UserModel(
            uuid,
            dto.username,
            dto.first_name,
            dto.second_name,
            dto.day_of_birth,
            dto.gender,
            now,
            now,
        );

        await this.authService.Create(credential, user);

        return new AuthRegisterResponseDTO();
    }

    public async Refresh(dto: AuthRefreshDTO): Promise<AuthRefreshResponseDTO> {
        const resp = await this.authenticationService.Update(dto.refresh);

        return new AuthRefreshResponseDTO(resp.access, resp.refresh);
    }

    private generatePasswordHash(pass: string): string {
        return pass;
    }
}
