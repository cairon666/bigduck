package main

import (
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

func main() {
	if len(os.Args) != 3 { //nolint:gomnd
		panic("migrations should start with: dir postgresUrl")
	}

	var (
		postgresURL = os.Args[1]
		dir         = os.Args[2]
	)

	db, err := goose.OpenDBWithDriver("pgx", postgresURL)
	if err != nil {
		panic(fmt.Errorf("goose: failed to open DB: %w", err))
	}

	if err := goose.Run("up", db, dir); err != nil {
		panic(fmt.Errorf("goose up: %w", err))
	}

	if err := db.Close(); err != nil {
		panic(fmt.Errorf("goose: failed to close DB: %w", err))
	}
}
