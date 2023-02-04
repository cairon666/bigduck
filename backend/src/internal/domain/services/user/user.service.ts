import {Repository, SelectQueryBuilder} from "typeorm";
import {User} from "../../../db/postgres/user.models";
import {getUsersDTO, getUsersFilter, getUsersResponseDTO} from "./dto";
import {boolean, string} from "yup";

export class UserService {
    private userRepo: Repository<User>

    private page_size: number = 10

    constructor(userRepo: Repository<User>) {
        this.userRepo = userRepo
    }

    public async getUsers(dto: getUsersDTO): Promise<getUsersResponseDTO> {
        dto.isValid()

        let builder = this.userRepo
            .createQueryBuilder("user")
            .limit(this.page_size)
            .offset((dto.page - 1) * this.page_size)
            .orderBy(dto.order.getOrders())

        const filterFields = dto.filter.getFields();
        (Object.keys(filterFields) as Array<keyof typeof filterFields>).forEach((key) => {
            switch (key) {
                case "date_create": {
                    const value = dto.filter[key]

                    if (value) {
                        builder = builder.andWhere( `user.${key} between :start and :end`, {
                            start: new Date(value.getFullYear(), value.getMonth(), value.getDay() - 2, 3, 0, 0),
                            end: new Date(value.getFullYear(), value.getMonth(), value.getDay() - 1, 2, 59, 59)
                        })
                    }
                    break
                }
                case "first_name":
                case "second_name":
                case "email":
                case "phone": {
                    const value = dto.filter[key]

                    if (value) {
                        builder = builder.andWhere(  `user.${key} ~ :${key}`, {
                            [key]: value
                        })
                    }
                    break
                }

                case "id":
                case "is_staff":
                case "is_admin":
                case "is_active": {
                    const value = dto.filter[key]

                    if (value) {
                        builder = builder.andWhere( `user.${key} = :${key}`, {
                            [key]: value
                        })
                    }
                    break
                }

            }
        })

        const [users, count] = await builder.getManyAndCount()

        const resp = new getUsersResponseDTO(count, users.map(user => ({
            id: user.id,
            first_name: user.first_name,
            second_name: user.second_name,
            date_create: user.date_create,
            date_modify: user.date_modify,
            is_staff: user.is_staff,
            is_admin: user.is_admin,
            is_active: user.is_active,
            email: user.email,
            phone: user.phone ? user.phone : undefined,
            avatar_url: user.avatar_url ? user.avatar_url : undefined,
            bio: user.bio ? user.bio : undefined,
        })))

        return resp
    }
}