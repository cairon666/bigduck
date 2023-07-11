package userstorage

import (
	"backend/internal/domain/models"
	"backend/pkg/logger"
	"github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Storage struct {
	client *pgxpool.Pool
	log    logger.Logger
	qb     squirrel.StatementBuilderType
}

func NewUserStorage(client *pgxpool.Pool, log logger.Logger) *Storage {
	return &Storage{
		client: client,
		log:    log,
		qb:     squirrel.StatementBuilder.PlaceholderFormat(squirrel.Dollar),
	}
}

func fillRolesFromArray(roles []*int) models.Roles {
	returnRoles := make(models.Roles, 0, len(roles))

	if len(roles) != 0 {
		for _, roleID := range roles {
			// roleID can be null, because we use aggregate function array_agg
			// see for more: https://postgrespro.ru/docs/postgresql/9.6/functions-aggregate
			if roleID == nil {
				continue
			}

			returnRoles = append(returnRoles, models.RoleID(*roleID))
		}
	}

	return returnRoles
}
