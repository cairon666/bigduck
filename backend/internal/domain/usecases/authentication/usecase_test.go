package authentication

import (
	"context"
	"testing"
)

func TestNewAuthUsecase(t *testing.T) {
	userService := NewMockUserService()
	registerService := NewMockRegisterService()
	usecase := NewAuthUsecase(userService, registerService)

	t.Run("check logic", func(t *testing.T) {
		t.Run("should success register", func(t *testing.T) {
			ctx := context.TODO()
			req1, err := usecase.RegisterFirst(ctx, RegisterFirstRequestDTO{Email: "example@example.example"})
			if err != nil {
				t.Fatal(err)
			}

			err = usecase.RegisterSecond(ctx, RegisterSecondRequestDTO{
				EmailCode: "0000",
				IdAuth:    req1.IdAuth,
			})
			if err != nil {
				t.Fatal(err)
			}

			err = usecase.RegisterThird(ctx, RegisterThirdRequestDTO{
				IdAuth:     req1.IdAuth,
				Password:   "gr3at@3wdsG",
				FirstName:  "12345678",
				SecondName: "12345678",
			})
			if err != nil {
				t.Fatal(err)
			}
		})

		t.Run("should fail email is unique", func(t *testing.T) {
			ctx := context.TODO()
			err := usecase.EmailIsUnique(ctx, EmailIsUniqueRequestDTO{Email: "example666@example.example"})
			if err != nil {
				t.Fatal(err)
			}
		})
	})

	t.Run("check dto", func(t *testing.T) {
		t.Run("LoginRequestDTO", func(t *testing.T) {
			t.Run("should be ok", func(t *testing.T) {
				dto := LoginRequestDTO{
					Email:    "tetetetest@test.test",
					Password: "gr3at@3wdsG",
				}
				if err := dto.IsValid(); err != nil {
					t.Fatal(err)
				}
			})

			t.Run("should be bad", func(t *testing.T) {
				dto := LoginRequestDTO{
					Email:    "",
					Password: "",
				}
				if err := dto.IsValid(); err == nil {
					t.Fatal("should be bad")
				}
			})
		})

		t.Run("RegisterFirstRequestDTO", func(t *testing.T) {
			t.Run("should be ok", func(t *testing.T) {
				dto := RegisterFirstRequestDTO{
					Email: "tetetetest@test.test",
				}
				if err := dto.IsValid(); err != nil {
					t.Fatal(err)
				}
			})

			t.Run("should be bad", func(t *testing.T) {
				dto := RegisterFirstRequestDTO{
					Email: "",
				}
				if err := dto.IsValid(); err == nil {
					t.Fatal("should be bad")
				}
			})
		})

		t.Run("RegisterSecondRequestDTO", func(t *testing.T) {
			t.Run("should be ok", func(t *testing.T) {
				dto := RegisterSecondRequestDTO{
					EmailCode: "0000",
					IdAuth:    "36209574-4793-4487-91f0-60acc8c8fcf6",
				}
				if err := dto.IsValid(); err != nil {
					t.Fatal(err)
				}
			})

			t.Run("should be bad", func(t *testing.T) {
				dto := RegisterSecondRequestDTO{
					EmailCode: "",
					IdAuth:    "",
				}
				if err := dto.IsValid(); err == nil {
					t.Fatal("should be bad")
				}
			})
		})

		t.Run("RegisterThirdRequestDTO", func(t *testing.T) {
			t.Run("should be ok", func(t *testing.T) {
				dto := RegisterThirdRequestDTO{
					IdAuth:     "36209574-4793-4487-91f0-60acc8c8fcf6",
					Password:   "gr3at@3wdsG",
					FirstName:  "Egor",
					SecondName: "Egor",
				}
				if err := dto.IsValid(); err != nil {
					t.Fatal(err)
				}
			})

			t.Run("should be bad", func(t *testing.T) {
				dto := RegisterThirdRequestDTO{
					IdAuth:     "",
					Password:   "",
					FirstName:  "",
					SecondName: "",
				}
				if err := dto.IsValid(); err == nil {
					t.Fatal("should be bad")
				}
			})
		})
	})
}
