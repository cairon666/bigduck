package models

// RecoverPassword - struct for processing recover password
type RecoverPassword struct {
	Email string
	// ID - for updating in database
	ID        string
	IsConfirm bool
	Code      string
	// PasswordHash and Salt for check, what old password not equal new password
	PasswordHash string
	Salt         string
}
