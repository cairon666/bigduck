package main

import (
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

const dir = "/migrations"

func main() {
	driver := os.Getenv("GOOSE_DRIVER")
	if driver == "" {
		log.Fatalf("env GOOSE_DRIVER should not be empty")
	}

	dbstring := os.Getenv("GOOSE_DBSTRING")
	if dbstring == "" {
		log.Fatalf("env GOOSE_DBSTRING should be not empty")
	}

	db, err := goose.OpenDBWithDriver(driver, dbstring)
	if err != nil {
		log.Fatalf("goose: failed to open DB: %v\n", err)
	}

	defer func() {
		if err := db.Close(); err != nil {
			log.Fatalf("goose: failed to close DB: %v\n", err)
		}
	}()

	if err := goose.Run("up", db, dir); err != nil {
		log.Panicf("goose up: %v", err)
	}
}
