package models

import "github.com/google/uuid"

type User struct {
	ID        uuid.UUID
	IsConfirm bool
	Email     string
	UserName  string
}

func NewUser(id uuid.UUID, isConfirm bool, email, userName string) User {
	return User{
		ID:        id,
		IsConfirm: isConfirm,
		Email:     email,
		UserName:  userName,
	}
}
