import {
    getUserDTO,
    getUserRequestDTO,
    updateUserDTO,
} from './dto';
import {DatabaseCodes} from "../../exceptions/database";
import {bedaDatabase} from "../utils";
import {User} from "../../models/user";

interface userRepo {
    getById(id: string): Promise<User | null>
    updateById(id: string, set: Omit<User, "id">): Promise<void>
}

export class UserService {
    private userRepo: userRepo;

    public constructor(userRepo: userRepo) {
        this.userRepo = userRepo;
    }

    public async updateUser(dto: updateUserDTO): Promise<void> {
        dto.isValid();

        await this.userRepo.updateById(dto.id, dto.set)
    }

    public async getUser(dto: getUserDTO): Promise<getUserRequestDTO> {
        dto.isValid();

        const user = await this.userRepo.getById(dto.id)

        if (!user) {
            throw bedaDatabase(DatabaseCodes.NotFound)
        }

        return new getUserRequestDTO(user);
    }
}
