import { getUserDataResponseDTO } from '@shared/api';
import { Gender, User, UserRoles } from '../model';

export function adaptStringToGender(gender: string | null): Gender | null {
    if (!gender) return null;

    if (gender === 'male') {
        return gender;
    }

    if (gender === 'female') {
        return gender;
    }

    return null;
}

export function adaptGetUserToUser(dto: getUserDataResponseDTO): User {
    let isAdmin = false;

    for (const role of dto.roles) {
        if (role === UserRoles.ADMIN) {
            isAdmin = true;
        }
    }

    return {
        id: dto.id,
        email: dto.email,
        is_confirmed: dto.is_confirmed,
        user_name: dto.user_name,
        first_name: dto.first_name,
        second_name: dto.second_name,
        date_of_birth: dto.date_of_birth,
        avatar: dto.avatar,
        gender: adaptStringToGender(dto.gender),
        create_at: dto.create_at,
        roles: dto.roles,
        isAdmin,
    };
}
