package userservice

import (
	"context"

	"backend/internal/domain/aggregate"
	"backend/internal/domain/models"
	"backend/pkg/filter"
	"github.com/google/uuid"
)

type Repository interface {
	ReadOneUser(ctx context.Context, filter filter.Filter) (models.User, error)
	ReadRolesByID(ctx context.Context, id uuid.UUID) (models.Roles, error)
	UpdateProfileByID(ctx context.Context, id uuid.UUID, data map[string]any) error
	UpdateCredentialByID(ctx context.Context, id uuid.UUID, data map[string]any) error
	UpdateUserByID(ctx context.Context, id uuid.UUID, data map[string]any) error
	ReadOneUserCredential(ctx context.Context, filter filter.Filter) (aggregate.UserCredential, error)
	ReadOneUserProfileRoles(ctx context.Context, filter filter.Filter) (aggregate.UserProfileRoles, error)
	RemoveRoleByID(ctx context.Context, id uuid.UUID, roleID models.RoleID) error
	AddRoleByID(ctx context.Context, id string, role models.RoleID) error
	DeleteByID(ctx context.Context, id string) error
	Create(ctx context.Context, user aggregate.UserFull) error
	ReadOneUserFull(ctx context.Context, filter filter.Filter) (aggregate.UserFull, error)
}

type service struct {
	repo Repository
}

func NewUserService(repo Repository) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) Create(ctx context.Context, user aggregate.UserFull) error {
	return s.repo.Create(ctx, user)
}

func (s *service) ReadOneUserFullByEmail(ctx context.Context, email string) (aggregate.UserFull, error) {
	return s.repo.ReadOneUserFull(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *service) ReadOneUserProfileRolesByID(ctx context.Context, id uuid.UUID) (aggregate.UserProfileRoles, error) {
	return s.repo.ReadOneUserProfileRoles(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *service) ReadOneUserByID(ctx context.Context, id uuid.UUID) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *service) ReadOneUserByEmail(ctx context.Context, email string) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *service) ReadOneUserByUsername(ctx context.Context, username string) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.username", filter.TypeEQ, username))
}

func (s *service) ReadOneUserCredentialByID(ctx context.Context, id uuid.UUID) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *service) ReadOneUserCredentialByEmail(ctx context.Context, email string) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *service) ReadOneUserCredentialByUsername(ctx context.Context, un string) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.username", filter.TypeEQ, un))
}

func (s *service) UpdateEmailByID(ctx context.Context, id uuid.UUID, email string) error {
	return s.repo.UpdateUserByID(ctx, id, map[string]any{
		"email":      email,
		"is_confirm": false,
	})
}

func (s *service) UpdatePasswordByID(ctx context.Context, id uuid.UUID, hash string, salt string) error {
	return s.repo.UpdateCredentialByID(ctx, id, map[string]any{
		"password_hash": hash,
		"salt":          salt,
	})
}

func (s *service) ConfirmEmailByID(ctx context.Context, id uuid.UUID) error {
	return s.repo.UpdateUserByID(ctx, id, map[string]any{
		"is_confirm": true,
	})
}
