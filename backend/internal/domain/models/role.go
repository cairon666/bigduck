package models

type RoleID int

var (
	RoleIDAdmin RoleID = 1
	RoleIDUser  RoleID = 2
)

type Roles []RoleID
