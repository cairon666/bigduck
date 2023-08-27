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
	AddRolesByID(ctx context.Context, id uuid.UUID, roles models.Roles) error
	DeleteByID(ctx context.Context, id string) error
	Create(ctx context.Context, user aggregate.UserFull) error
	ReadOneUserFull(ctx context.Context, filter filter.Filter) (aggregate.UserFull, error)
}

type Service struct {
	repo Repository
}

func NewUserService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(ctx context.Context, user aggregate.UserFull) error {
	return s.repo.Create(ctx, user)
}

func (s *Service) ReadOneUserFullByEmail(ctx context.Context, email string) (aggregate.UserFull, error) {
	return s.repo.ReadOneUserFull(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *Service) ReadOneUserProfileRolesByID(ctx context.Context, id uuid.UUID) (aggregate.UserProfileRoles, error) {
	return s.repo.ReadOneUserProfileRoles(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *Service) ReadOneUserByID(ctx context.Context, id uuid.UUID) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *Service) ReadOneUserByEmail(ctx context.Context, email string) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *Service) ReadOneUserByUsername(ctx context.Context, username string) (models.User, error) {
	return s.repo.ReadOneUser(ctx, filter.New("users.username", filter.TypeEQ, username))
}

func (s *Service) ReadOneUserCredentialByID(ctx context.Context, id uuid.UUID) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.id", filter.TypeEQ, id))
}

func (s *Service) ReadOneUserCredentialByEmail(ctx context.Context, email string) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.email", filter.TypeEQ, email))
}

func (s *Service) ReadOneUserCredentialByUsername(ctx context.Context, un string) (aggregate.UserCredential, error) {
	return s.repo.ReadOneUserCredential(ctx, filter.New("users.username", filter.TypeEQ, un))
}

func (s *Service) UpdateEmailByID(ctx context.Context, id uuid.UUID, email string) error {
	return s.repo.UpdateUserByID(ctx, id, map[string]any{
		"email":      email,
		"is_confirm": false,
	})
}

func (s *Service) UpdatePasswordByID(ctx context.Context, id uuid.UUID, hash string, salt string) error {
	return s.repo.UpdateCredentialByID(ctx, id, map[string]any{
		"password_hash": hash,
		"salt":          salt,
	})
}

func (s *Service) ConfirmEmailByID(ctx context.Context, id uuid.UUID) error {
	return s.repo.UpdateUserByID(ctx, id, map[string]any{
		"is_confirm": true,
	})
}
