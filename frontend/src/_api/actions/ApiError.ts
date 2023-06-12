export enum ApiErrorCodes {
    CodeNotFound = 1,
    CodeEmailAlreadyExist,
    CodeBadPassword,
    CodeGenderNotFound,
    CodeBadEmail,
    CodeShortPassword,
    CodeShortFirstName,
    CodeShortSecondName,
    CodeBadAvatarURL,
    CodeUnknownGender,
    CodeBadUUID,
    CodeBadData,
    CodeBadRecoverCode,
    CodeRecoverEmailNotConfirm,
    CodeNotValidRecoverCode,
    CodeNewPasswordEqualOldPassword,
    CodeDateOfBirthFromFeature,
}

export interface ApiError {
    errors: {
        code: ApiErrorCodes;
        message: string;
    }[];
}
