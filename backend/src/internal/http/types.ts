export interface AuthStorageUnit {
    id: string
    is_admin: boolean
    is_staff: boolean
}
export const NameCookieAccess = "accessToken"
export const NameCookieRefresh = "refreshToken"