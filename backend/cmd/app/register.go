package main

import (
	"backend/internal/adapters/mailadapter"
	"backend/internal/config"
	"backend/internal/domain/models"
	"backend/internal/domain/services/attachmentservice"
	"backend/internal/domain/services/confirmEmailCodeService"
	"backend/internal/domain/services/mailservice"
	"backend/internal/domain/services/recoverPasswordCodeService"
	"backend/internal/domain/services/userservice"
	"backend/internal/domain/usecases/attachmentusecase"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	httpServer "backend/internal/httpServer/v1"
	"backend/internal/repositories/kvstorage"
	"backend/internal/repositories/s3storage"
	"backend/internal/repositories/userstorage"
	"backend/pkg/database/postgres"
	redis2 "backend/pkg/database/redis"
	"backend/pkg/logger"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"go.uber.org/dig"
)

func RegisterServices(c *dig.Container) {
	panicIfError(c.Provide(mailservice.NewMailService, dig.As(
		new(authusecase.MailService),
		new(userusecase.MailService),
	)))
	panicIfError(c.Provide(userservice.NewUserService, dig.As(
		new(authusecase.UserService),
		new(userusecase.UserService),
	)))
	panicIfError(c.Provide(recoverpasswordcodeservice.New, dig.As(new(authusecase.RecoverPasswordCodeService))))
	panicIfError(c.Provide(confirmemailcodeservice.New, dig.As(new(userusecase.ConfirmEmailCodeService))))
	panicIfError(c.Provide(attachmentservice.NewService, dig.As(new(attachmentusecase.AttachmentService))))
}

func RegisterAdapters(c *dig.Container) {
	panicIfError(c.Provide(mailadapter.NewMailAdapter, dig.As(new(mailservice.MailProvider))))
}

func RegisterUsecases(c *dig.Container) {
	panicIfError(c.Provide(authusecase.NewAuthUsecase))
	panicIfError(c.Provide(userusecase.NewUsecase))
	panicIfError(c.Provide(attachmentusecase.NewUsecase))
}

func RegisterLogger(c *dig.Container) {
	panicIfError(c.Provide(logger.NewDev))
}

func RegisterConnectors(c *dig.Container) {
	panicIfError(c.Provide(func(log logger.Logger, conf *config.Config) (*pgxpool.Pool, error) {
		return postgres.NewPostgresClient(conf.Postgres, postgres.WithLogger(log))
	}))
	panicIfError(c.Provide(func(conf *config.Config) (*redis.Client, error) {
		return redis2.NewRedisClient(conf.Redis.URL)
	}))
	panicIfError(c.Provide(func(conf *config.Config, log logger.Logger) (*s3.S3, error) {
		mySession, err := session.NewSession(&aws.Config{
			Region:           aws.String(conf.AWS.Region),
			Logger:           logger.ToAWSLogger(logger.WithLogger(log)),
			Credentials:      credentials.NewStaticCredentials(conf.AWS.AccessKeyID, conf.AWS.SecretAccessKey, ""),
			Endpoint:         aws.String(conf.AWS.Endpoint),
			DisableSSL:       aws.Bool(false),
			S3ForcePathStyle: aws.Bool(true),
		})
		if err != nil {
			return nil, err
		}

		return s3.New(mySession), nil
	}))
}

func RegisterConfig(c *dig.Container) {
	panicIfError(c.Provide(func() (*config.Config, error) {
		conf, err := config.NewConfig()
		return conf, err
	}))
}

func RegisterServer(c *dig.Container) {
	panicIfError(c.Provide(httpServer.NewServer))
}

func RegisterStorages(c *dig.Container) {
	panicIfError(c.Provide(userstorage.NewUserStorage, dig.As(new(userservice.Repository))))
	panicIfError(c.Provide(func(rdb *redis.Client) confirmemailcodeservice.KVRepo {
		return kvstorage.NewKVStorage[*models.ConfirmEmailCode](rdb)
	}))
	panicIfError(c.Provide(func(rdb *redis.Client) recoverpasswordcodeservice.KVRepo {
		return kvstorage.NewKVStorage[*models.RecoverPassword](rdb)
	}))
	panicIfError(c.Provide(s3storage.NewStorage, dig.As(new(attachmentservice.Repository))))
}
