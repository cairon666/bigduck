export enum UserModelGender {
    MALE = "male",
    FEMALE = "female",
}

export class UserModel {
    public constructor(public id: string,
                       public username: string,
                       public first_name: string,
                       public second_name: string,
                       public day_of_birth: Date | null,
                       public gender: UserModelGender | null,
                       public date_create: Date,
                       public date_modify: Date,
    ) {
    }
}