export enum AppErrorCodes {
    CodeNotFound = 1,
    CodeEmailAlreadyExist,
    CodeBadPassword,
    CodeBadRecoverCode,
    CodeRecoverEmailNotConfirm,
    CodeNewPasswordEqualOldPassword,
    CodeWrongOldPassword,
    CodeUserNameAlreadyExist,
    CodeIDAlreadyExist,
    CodeRoleAlreadyExist,
    CodeNewEmailEqualOldEmail,
    CodeLargeImage,
    CodeBadImageExtension,
}

export enum ValidateErrorCodes {
    CodeNone = 0,
    CodeShort,
    CodeLong,
    CodeBadFormat,
    CodeSpecialCharacter,
    CodeOneDigital,
    CodeOneUpperCharacter,
    CodeOneLowerCharacter,
    CodeUnknownType,
    CodeFromFeature,
}
