package aggregate

import "backend/internal/domain/models"

// UserFull - for create
type UserFull struct {
	User       models.User
	Profile    models.Profile
	Credential models.Credential
	Roles      models.Roles
}

// UserProfileRoles - for display data
type UserProfileRoles struct {
	User    models.User
	Profile models.Profile
	Roles   models.Roles
}

// UserCredential - for auth
type UserCredential struct {
	User       models.User
	Credential models.Credential
}

func NewUserFull(
	user models.User,
	profile models.Profile,
	credential models.Credential,
	roles models.Roles,
) UserFull {
	return UserFull{
		User:       user,
		Profile:    profile,
		Credential: credential,
		Roles:      roles,
	}
}

func NewUserProfileRoles(
	user models.User,
	profile models.Profile,
	roles models.Roles,
) UserProfileRoles {
	return UserProfileRoles{
		User:    user,
		Profile: profile,
		Roles:   roles,
	}
}

func NewUserCredential(
	user models.User,
	credential models.Credential,
) UserCredential {
	return UserCredential{
		User:       user,
		Credential: credential,
	}
}
